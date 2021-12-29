"use strict";

const path = require("path");
const DRIVER = "redis";

module.exports = {
    redis: require(path.resolve(process.cwd(), "data_access", "redis", "index")),
    sqlite: require(path.resolve(process.cwd(), "data_access", "sqlite", "index"))
};