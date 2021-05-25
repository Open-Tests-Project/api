"use strict";

const path = require("path");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");

const JSON_GET = promisify(redis.json_get).bind(redis);
const JSON_SET = promisify(redis.json_set).bind(redis);

module.exports = {


    create: async function (options) {


        var key = keysFactory.test(options.payload.test_name, options.user_id);
        var studies = await JSON_GET(key);
        var path;
        if (studies) {
            path = options.payload.study_name;
            await JSON_SET(key, path, JSON.stringify(options.payload));
        } else {
            path = "."
            var payload = {};
            payload[options.payload.study_name] = options.payload;
            await JSON_SET(key, path, JSON.stringify(payload));
        }


        return JSON.parse(await JSON_GET(key));

    }
};