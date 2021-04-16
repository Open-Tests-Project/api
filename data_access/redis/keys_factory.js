"use strict";


const static_keys = {
    AVAILABLE_TESTS: "available_tests"
};

module.exports = {

    user: function (email) {
        return `user:${email}`;
    },
    static: static_keys

};