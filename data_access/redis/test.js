"use strict";

const path = require("path");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");

const SADD = promisify(redis.SADD).bind(redis);
const SMEMBERS  = promisify(redis.SMEMBERS ).bind(redis);
const HGETALL = promisify(redis.HGETALL).bind(redis);
const JSON_GET = promisify(redis.json_get).bind(redis);
const JSON_SET = promisify(redis.json_set).bind(redis);

//"user:1000:followers"

module.exports = {


    create: async function (payload) {


        //
        // var t = {
        //     "a": "a",
        //     "uno": 1
        // }
        // var r = await HMSET("available_tests", t);
        // var r = await HMSET("key", "foo", "bar", "hello", "world");
        //
        // console.log(r)
        // r = await HGETALL("available_tests");
        // console.log(r)

        var path = ".";
        var r = await JSON_SET("object23", path, JSON.stringify({"status": "ok", "uno": 1, "a": {}}));
        console.log(r);
        r = await JSON_GET("object23");
        console.log(r);

    },
    add: async function (testName) {
        await SADD(keysFactory.static.AVAILABLE_TESTS, testName);
    },
    list: async function () {
        return await SMEMBERS(keysFactory.static.AVAILABLE_TESTS);
    }
};