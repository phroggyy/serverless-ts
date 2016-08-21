"use strict";
var Error = (function () {
    function Error() {
    }
    Error.all = function () {
        return this.errors;
    };
    Error.get = function (key) {
        return this.errors[key];
    };
    Error.errors = {
        auth: {
            user_exists: {
                message: "The email has already been taken",
                code: 1001
            }
        }
    };
    return Error;
}());
exports.Error = Error;
//# sourceMappingURL=Error.js.map