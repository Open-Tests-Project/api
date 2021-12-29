"use strict";

const SEPARATOR = ":";
const static_keys = {
    AVAILABLE_TESTS: "available_tests"
};

// test:iat
// test:iat:user=21234
// ###user:1234:test:iat
//"user:1000:followers"
// test:<type>:
module.exports = {

    user: function (email) {
        return `user${SEPARATOR}${email}`;
    },
    test: function (testName, userId) {
        if (!testName) {
            throw new Error("testName can not be empty");
        }

        var test = `test${SEPARATOR}${testName}`;
        if (userId) {
            test += `${SEPARATOR}user=${userId}`;
        }

        return test;

    },
    study: function (userId, studyId = Date.now()) {

        if (!userId) {
            throw new Error("userId can not be empty");
        }

        return `study${SEPARATOR}user=${userId}${SEPARATOR}${studyId}`;

    },
    studies: function (userId) {

        if (!userId) {
            throw new Error("userId can not be empty");
        }

        return `study${SEPARATOR}user=${userId}${SEPARATOR}*`;

    },
    static: static_keys

};



