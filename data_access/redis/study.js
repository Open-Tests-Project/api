"use strict";

const path = require("path");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");

const JSON_GET = promisify(redis.json_get).bind(redis);
// const JSON_MGET = promisify(redis.json_mget).bind(redis);
const JSON_SET = promisify(redis.json_set).bind(redis);
const JSON_DEL = promisify(redis.json_del).bind(redis);

module.exports = {

    create: async function (options) {

        var testName = options.test_name;
        var key = keysFactory.test(testName, options.user_id);
        var studies = await JSON_GET(key);
        var studyName = Object.keys(options.new_study)[0];

        var path;
        if (studies !== "null") {
            path = studyName;
            await JSON_SET(key, path, JSON.stringify(options.new_study[studyName]));
        } else {
            path = ".";
            await JSON_SET(key, path, JSON.stringify(options.new_study));
        }

        return JSON.parse(await JSON_GET(key));

    },
    read: async function (options) {
        var key = keysFactory.test(options.test_name, options.user_id);
        return JSON.parse(await JSON_GET(key));
    },
    delete: async function (options) {

        var key = keysFactory.test(options.test_name, options.user_id);
        if (!options.study_name) {
            throw new Error("invalid study_name: " + options.study_name);
        }
        var path = "." + options.study_name;
        await JSON_DEL(key, path)

        return JSON.parse(await JSON_GET(key))
    },

};