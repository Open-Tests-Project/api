"use strict";

var path = require("path");
var db = require(path.resolve(process.cwd(), "drivers", "sqlite"));

module.exports = {
    users: require("./users")(db),
    studies: require("./studies")(db),
    tests: require("./tests")(db),
    available_tests: require("./available_tests")(db),
    close: function (callback) {
        db.close(function (err) {
            if (!err) {
                console.log("db close successfully")
            }
            if (typeof callback === "function") {
                callback(err);
            }
        });
    }
};