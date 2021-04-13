
"use strict";


const path = require("path");
const bcrypt = require("bcrypt");
const config = require(path.resolve(process.cwd(), "config"));
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const helpers = require(path.resolve(process.cwd(), "helpers"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");
const INCR = promisify(redis.INCR).bind(redis);
const HMSET = promisify(redis.HMSET).bind(redis);
const HGETALL = promisify(redis.HGETALL).bind(redis);
const axios = require('axios');




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
        scope: payload.scope || "",
        role: payload.role || "user"
    }

    await HMSET(userKey, newUser);


}


(async function () {

    var payload = {
        email: "simone",
        password: "",
        role: ""
    };

    await create(payload);


    axios({
        url: config.BASE_URL + "/signin",
        method: "post",
        data: {
            email: payload.email,
            password: payload.password
        }
    })
        .then(function (response) {
            // handle success
            console.log(response.status);
            console.log(response.data);
        })
        .catch(function (error) {
            // handle error
            console.log(error.response.status);
            console.log(error.response.data);
        })
    ;

})()

