"use strict";
var aws_sdk_1 = require("aws-sdk");
var DB = (function () {
    function DB(table) {
        this.table = table;
        this.db = new aws_sdk_1.DynamoDB();
    }
    DB.prototype.store = function (item, condition) {
        item = this.formatItem(item);
        this.db.putItem({
            TableName: this.table,
            Item: item,
            ConditionExpression: condition
        });
    };
    DB.prototype.get = function (key, callback) {
        var item = {
            TableName: this.table,
            Key: this.formatItem(key)
        };
        this.db.getItem(item, callback);
    };
    DB.prototype.formatItem = function (item) {
        var formatted = {};
        Object.keys(item).forEach(function (property) {
            switch (typeof item[property]) {
                case 'string':
                    formatted[property] = { S: item[property] };
                case 'number':
                    formatted[property] = { N: "" + item[property] };
                case 'bool':
                    formatted[property] = { BOOL: item[property] };
            }
        });
        return formatted;
    };
    return DB;
}());
exports.DB = DB;
//# sourceMappingURL=DB.js.map