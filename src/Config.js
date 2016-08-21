"use strict";
var Config = (function () {
    function Config() {
    }
    Config.all = function () {
        return this.config;
    };
    Config.get = function (key) {
        return this.config[key];
    };
    Config.config = {
        bucket: "cnyn-mysql-backup-dev",
        maxAge: "10",
        dbTable: "cnyn-backups-auth-dev",
        identityPool: "Cnyn Backups",
        developerProvider: "login.cnyn.backups",
        externalName: "My Authentication",
        emailSource: "no-reply@sparky.io",
        verificationPage: "http://bucket.s3.amazonaws.com/verify.html",
        resetPage: "http://bucket.s3.amazonaws.com/reset.html"
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=Config.js.map