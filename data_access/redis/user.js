"use strict";

var path = require("path");
var redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const { promisify } = require("util");
const ACL = promisify(redis.ACL).bind(redis);

module.exports = {

    create: async function (payload) {
        var result = await ACL("GETUSER", payload.email);

        if (!result) {
            await ACL("SETUSER", payload.email, "on", `>${payload.password}`, `~${payload.email}:*`, "+get", "+set");
        }

        return {
            email: payload.email
        };
    }
};