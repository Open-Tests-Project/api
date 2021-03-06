"use strict";

const path = require("path");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const keysFactory = require(path.resolve(process.cwd(), "data_access", "redis", "keys_factory"));
const { promisify } = require("util");

const JSON_GET = promisify(redis.json_get).bind(redis);
const JSON_MGET = promisify(redis.json_mget).bind(redis);
const JSON_SET = promisify(redis.json_set).bind(redis);
const JSON_DEL = promisify(redis.json_del).bind(redis);
const KEYS = promisify(redis.KEYS).bind(redis);


const DAO = {

    create: async function (options) {
        //
        // var testKey = keysFactory.test(options.test_name);
        // var testPath  = `${options.test_type}.${options.lang}`;
        var testAttributes = await DAO.readAttributes(options)

        var study = {
            study_name: options.study_name,
            tests: [{
                test_type: options.test_type,
                lang: options.lang,
                test_name: options.test_name,
                attributes: testAttributes
            }],
            patients: []
        };

        var studyKey = keysFactory.study(options.user_id);
        var studyPath = ".";
        await JSON_SET(studyKey, studyPath, JSON.stringify(study));

        return study;

        // var key = keysFactory.study(options.user_id);
        // var studyName = Object.keys(options.new_study)[0];
        //
        // var path;
        // if (studies !== "null") {
        //     path = studyName;
        //     await JSON_SET(key, path, JSON.stringify(options.new_study[studyName]));
        // } else {
        //     path = ".";
        //     await JSON_SET(key, path, JSON.stringify(options.new_study));
        // }
        //
        // // return JSON.parse(await JSON_GET(key, path));
        // //return JSON.parse(await JSON_GET(key));
        // return options.new_study;

    },
    readAttributes: async function (options) {
        var testKey = keysFactory.test(options.test_name);
        var testPath  = `${options.test_type}.${options.lang}`;
        var testAttributes = JSON.parse(await JSON_GET(testKey, testPath));
        return testAttributes;
    },
    read: async function (options) {
        var studiesKey = keysFactory.studies(options.user_id);
        var studiesPath = "$.";
        // return studiesKey;
        return await KEYS(studiesKey);
        // var key = keysFactory.test(options.test_name, options.user_id);
        // return JSON.parse(await JSON_GET(key));
    },
    delete: async function (options) {

        var key = keysFactory.test(options.test_name, options.user_id);
        if (!options.study_name) {
            throw new Error("invalid study_name: " + options.study_name);
        }
        var path = "." + options.study_name;
        await JSON_DEL(key, path)

        return JSON.parse(await JSON_GET(key));
    },
    rename: async function (options) {
        var key = keysFactory.test(options.test_name, options.user_id);
        var path = ".";
        var studies = JSON.parse(await JSON_GET(key, path));
        studies[options.new_name] = studies[options.old_name];
        delete studies[options.old_name];
        await JSON_SET(key, path, JSON.stringify(studies));
        return {
            new_name: options.new_name
        };
    },
    update: async function (options) {
        var key = keysFactory.test(options.test_name, options.user_id);
        var path = ".";
        var studies = JSON.parse(await JSON_GET(key, path));
        studies[options.new_name] = studies[options.old_name];
        delete studies[options.old_name];
        await JSON_SET(key, path, JSON.stringify(studies));
        return {
            new_name: options.new_name
        };
    },

}

module.exports = DAO;