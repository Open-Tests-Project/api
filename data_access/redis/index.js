"use strict";

var path = require("path");
var redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const { promisify } = require("util");
const INCR = promisify(redis.INCR).bind(redis);

module.exports = {
    utils: {
        incr: async function (key) {
            return await INCR(key);
        }
    },
    user: require("./user")
};
