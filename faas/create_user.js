
"use strict";

const path = require("path");
const bcrypt = require("bcrypt");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const helpers = require(path.resolve(process.cwd(), "helpers"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");
const INCR = promisify(redis.INCR).bind(redis);
const HMSET = promisify(redis.HMSET).bind(redis);
const HGETALL = promisify(redis.HGETALL).bind(redis);


async function create (payload) {

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
        created_at: helpers.currentDatetime(),
        scope: payload.scope || [],
        role: payload.role || "user"
    }
    console.log(newUser)
    await HMSET(userKey, newUser);
}


create({
    email: "homeuser@email.com",
    password: "home",
    scope: "home"
}).then();
