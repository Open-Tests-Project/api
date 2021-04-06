"use strict";

const path = require("path");
const DRIVER = "redis";
const dataAccess = require(path.resolve(process.cwd(), "data_access", DRIVER, "index"));

module.exports = dataAccess;