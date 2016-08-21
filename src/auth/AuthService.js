"use strict";
var crypto = require("crypto");
var AuthService = (function () {
    function AuthService(db) {
        this.db = db;
    }
    AuthService.prototype.getUser = function (email, fn) {
        this.db.get({
            email: email
        }, function (err, data) {
            if (err)
                return fn(err);
            else {
                if ('Item' in data) {
                    var hash = data.Item.passwordHash.S;
                    var salt = data.Item.passwordSalt.S;
                    var verified = data.Item.verified.BOOL;
                    fn(null, hash, salt, verified);
                }
                else {
                    fn(null, null); // User not found
                }
            }
        });
    };
    AuthService.prototype.storeUser = function (email, password, salt, fn) {
        // Bytesize
        var len = 128;
        crypto.randomBytes(len, function (err, bufferedToken) {
            if (err)
                return fn(err);
            var token = bufferedToken.toString('hex');
            this.db.store({
                email: email,
                passwordHash: password,
                passwordSalt: salt,
                verified: true,
                verifyToken: token
            }, 'attribute_not_exists (email)', function (err, data) {
                if (err)
                    return fn(err);
                else
                    fn(null, token);
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=AuthService.js.map