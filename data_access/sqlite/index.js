"use strict";

var path = require("path");
var db = require(path.resolve(process.cwd(), "drivers", "sqlite"));

module.exports = {
    studies: require("./studies")(db),
    tests: require("./tests")(db),
};