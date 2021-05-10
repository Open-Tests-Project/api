"use strict";

const path = require("path");
const redis = require(path.resolve(process.cwd(), "drivers", "redis"));
const { promisify } = require("util");

// const SADD = promisify(redis.SADD).bind(redis);
// const SMEMBERS  = promisify(redis.SMEMBERS ).bind(redis);
const HGETALL = promisify(redis.HGETALL).bind(redis);
const JSON_GET = promisify(redis.json_get).bind(redis);
const JSON_SET = promisify(redis.json_set).bind(redis);
const JSON_TYPE = promisify(redis.json_type).bind(redis);
const JSON_RESP = promisify(redis.json_resp).bind(redis);

//

// var r = await HMSET("available_tests", t);
// var r = await HMSET("key", "foo", "bar", "hello", "world");
//
// console.log(r)
// r = await HGETALL("available_tests");
// console.log(r)

async function main () {
    var t = {
        "a": {
            "b": {
                "c": 1
            }
        }
    };
    var key = "object23";
    var path = ".";
    await JSON_SET(key, path, JSON.stringify(t));
    await JSON_SET(key, "a.b", JSON.stringify({d:2}));
    var r = await JSON_GET(key, "a.b");
    console.log(JSON.stringify(JSON.parse(r), null, 2));
    console.log(await JSON_RESP(key, "."));

    // await JSON_SET("scalar ", ".", "ciao");
    // console.log(await JSON_GET("object24"));
}


main();


// const path = require("path");
// const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
//
// dataAccess.test.create().then(function () {
//
// });

// const axios = require('axios');

// axios({
//     url: "http://simonedev/myapi/signup",
//     method: "post",
//     data: {
//         email: "ciao",
//         password: "ciao"
//     }
// })
//     .then(function (response) {
//         // handle success
//         console.log(response.status);
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error.response.status);
//         console.log(error.response.data);
//     })
// ;


// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic2ltb25lNCJ9LCJpYXQiOjE2MTc3MjM1NTd9.6GnkEslVCrcvo6ogNtSLbyNdBNdwk08YupD6Y8g4un0";
// axios({
//     url: "http://simonedev/myapi/cv/visitcounter",
//     method: "get",
//     headers: {
//         authorization: "Bearer " + TOKEN,
//     }
// })
//     .then(function (response) {
//         // handle success
//         console.log(response.status);
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error.response.status);
//         console.log(error.response.data);
//     })
// ;