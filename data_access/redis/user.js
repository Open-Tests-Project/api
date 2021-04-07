"use strict";

var path = require("path");
var redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const { promisify } = require("util");
const ACL = promisify(redis.ACL).bind(redis);
const AUTH = promisify(redis.AUTH).bind(redis);
const send_command = promisify(redis.send_command).bind(redis);

module.exports = {

    create: async function (payload) {
        var result = await ACL("GETUSER", payload.email);

        if (!result) {
            await ACL("SETUSER", payload.email, "on", `>${payload.password}`, `~${payload.email}:*`, "+get", "+set");
        }

        return {
            email: payload.email
        };
    },

    findOne: async function (email) {
        var result = await ACL("GETUSER", email);

        return result;
    },


    login: async function (payload) {
        await send_command('AUTH', [payload.email, payload.password]);
        return {
            email: payload.email
        };

    },
};