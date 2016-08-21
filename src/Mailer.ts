import {Config} from "./Config";
import {SES} from "aws-sdk";

export class Mailer {
    sendVerificationEmail(email: string, token: string, fn: any) {
        var subject = 'Verification Email for ' + Config.get('externalName');
        var verificationLink = Config.get('verificationPage') + '?email=' + encodeURIComponent(email) + '&verify=' + token;
        let ses: SES = new SES()
        ses.sendEmail({
            Source: Config.get('emailSource'),
            Destination: {
                ToAddresses: [
                    email
                ]
            },
            Message: {
                Subject: {
                    Data: subject
                },
                Body: {
                    Html: {
                        Data: '<html><head>'
                        + '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
                        + '<title>' + subject + '</title>'
                        + '</head><body>'
                        + 'Please <a href="' + verificationLink + '">click here to verify your email address</a> or copy & paste the following link in a browser:'
                        + '<br><br>'
                        + '<a href="' + verificationLink + '">' + verificationLink + '</a>'
                        + '</body></html>'
                    }
                }
            }
        }, fn);
    }
}

