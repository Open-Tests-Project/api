"use strict";

const path = require("path");
const bcrypt = require("bcrypt");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const helpers = require(path.resolve(process.cwd(), "helpers"));
const { promisify } = require("util");
const ACL = promisify(redis.ACL).bind(redis);
const AUTH = promisify(redis.AUTH).bind(redis);
const send_command = promisify(redis.send_command).bind(redis);
const INCR = promisify(redis.INCR).bind(redis);
const HMSET = promisify(redis.HMSET).bind(redis);
const HGETALL = promisify(redis.HGETALL).bind(redis);



module.exports = {

    createUsingAcl: async function (payload) {
        var result = await ACL("GETUSER", payload.email);

        if (!result) {
            await ACL("SETUSER", payload.email, "on", `>${payload.password}`, `~${payload.email}:*`, "+get", "+set");
        }

        return {
            email: payload.email
        };
    },
    findOneUsingAcl: async function (email) {
        var result = await ACL("GETUSER", email);

        return result;
    },
    loginUsingAcl: async function (payload) {
        await send_command('AUTH', [payload.email, payload.password]);
        return {
            email: payload.email
        };

    },
    create: async function (payload) {

        const userKey = keysFactory.user(payload.email);
        const user = await HGETALL(userKey);

        if (user) {
            var error = new Error(`The user ${payload.email} already exists`);
            error.validation = true;
            throw error;
        }

        const userId = await INCR("users_counter");
        const newUser = {
            id: userId,
            email: payload.email,
            password: await bcrypt.hash(payload.password, 10),
            created_at: helpers.currentDatetime()
        }
        await HMSET(userKey, newUser);
        return {
            email: payload.email,
            id: userId,
            role: "",
            scope: ""
        };

    },

    findOne: async function (email) {
        var result = await ACL("GETUSER", email);

        return result;
    },


    login: async function (payload) {
        const user = await HGETALL(keysFactory.user(payload.email));
        if (!user || !await bcrypt.compare(payload.password, user.password)) {
            var error = new Error(`Invalid credentials`);
            error.unauthorized = true;
            throw error;
        }
        return {
            email: user.email,
            id: user.id,
            role: user.role,
            scope: user.scope
        };

    },
};