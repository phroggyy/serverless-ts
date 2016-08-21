'use strict';
import {Hasher} from "../src/auth/Hasher"
import {AuthService} from "../src/auth/AuthService";
import {DB} from "../src/persistence/DB";
import {Error} from "../Error"
import {Config} from "../src/Config";

module.exports.register = (event: any, context: any, cb: any) => {
    var email = event.body.email;
    var clearPassword = event.body.password;
    let auth = new AuthService(new DB(Config.get('dbTable')))

    Hasher.hash(clearPassword, function(err: Error, salt: string, hash: string) {
        if (err) {
            context.fail('Error in hash: ' + err);
        } else {
            auth.storeUser(email, hash, salt, function(err: any, token: string) {
                if (err) {
                    if (err.code == 'ConditionalCheckFailedException') {
                        // userId already found
                        context.fail(JSON.stringify({
                            created: false,
                            error: Error.get('auth').user_exists
                        }));
                    } else {
                        context.fail('Error in storeUser: ' + err);
                    }
                } else {
                    context.succeed(JSON.stringify({
                        created: true,
                        user: {
                            email: email
                        }
                    }));
                }
            })
        }
    });
}