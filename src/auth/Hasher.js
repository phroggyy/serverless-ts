"use strict";
var crypto = require('crypto');
var Hasher = (function () {
    function Hasher() {
    }
    Hasher.hash = function (password, salt, callback) {
        if (callback === void 0) { callback = null; }
        var len = 128;
        var iterations = 4096;
        if (3 == arguments.length) {
            crypto.pbkdf2(password, salt, iterations, len, callback);
        }
        else {
            callback = salt;
            crypto.randomBytes(len, function (err, saltBuffer) {
                if (err)
                    return callback(err);
                var salt = saltBuffer.toString('base64');
                crypto.pbkdf2(password, salt, iterations, len, function (err, derivedKey) {
                    if (err)
                        return callback(err);
                    callback(null, salt, derivedKey.toString('base64'));
                });
            });
        }
    };
    return Hasher;
}());
exports.Hasher = Hasher;
//# sourceMappingURL=Hasher.js.map