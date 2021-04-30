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
    static: static_keys

};



