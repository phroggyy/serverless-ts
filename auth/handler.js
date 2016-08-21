'use strict';
var Hasher_1 = require("../src/auth/Hasher");
var AuthService_1 = require("../src/auth/AuthService");
var DB_1 = require("../src/persistence/DB");
var Error_1 = require("../Error");
var Config_1 = require("../src/Config");
module.exports.register = function (event, context, cb) {
    var email = event.body.email;
    var clearPassword = event.body.password;
    var auth = new AuthService_1.AuthService(new DB_1.DB(Config_1.Config.get('dbTable')));
    Hasher_1.Hasher.hash(clearPassword, function (err, salt, hash) {
        if (err) {
            context.fail('Error in hash: ' + err);
        }
        else {
            auth.storeUser(email, hash, salt, function (err, token) {
                if (err) {
                    if (err.code == 'ConditionalCheckFailedException') {
                        // userId already found
                        context.fail(JSON.stringify({
                            created: false,
                            error: Error_1.Error.get('auth').user_exists
                        }));
                    }
                    else {
                        context.fail('Error in storeUser: ' + err);
                    }
                }
                else {
                    context.succeed(JSON.stringify({
                        created: true,
                        user: {
                            email: email
                        }
                    }));
                }
            });
        }
    });
};
//# sourceMappingURL=handler.js.map