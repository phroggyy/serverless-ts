"use strict";
var Config_1 = require("./Config");
var aws_sdk_1 = require("aws-sdk");
var Mailer = (function () {
    function Mailer() {
    }
    Mailer.prototype.sendVerificationEmail = function (email, token, fn) {
        var subject = 'Verification Email for ' + Config_1.Config.get('externalName');
        var verificationLink = Config_1.Config.get('verificationPage') + '?email=' + encodeURIComponent(email) + '&verify=' + token;
        var ses = new aws_sdk_1.SES();
        ses.sendEmail({
            Source: Config_1.Config.get('emailSource'),
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
    };
    return Mailer;
}());
exports.Mailer = Mailer;
//# sourceMappingURL=Mailer.js.map