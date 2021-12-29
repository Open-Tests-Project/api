"use strict";

var path = require("path");
var db = require(path.resolve(process.cwd(), "drivers", "sqlite"));

module.exports = {
    study: require("./study")(db),
    test: require("./test")(db),
};