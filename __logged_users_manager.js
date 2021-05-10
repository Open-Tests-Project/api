"use strict";

const path = require("path");
const config = require(path.resolve(process.cwd(), "config"));
const Conf = require('conf');

var cache = new Conf({
    encryptionKey: config.JWT_SECRET,
    clearInvalidConfig: true
});

var _loggedUsers = cache.store ? JSON.parse(JSON.stringify(cache.store)) : {};

module.exports = {
    update: function (uid, user) {
        _loggedUsers[uid] = user;
    },
    get: function () {
        return _loggedUsers;
    },
    getUser: function (uid) {
        if (_loggedUsers.hasOwnProperty(uid)) {
            return _loggedUsers[uid];
        }
        var error = new Error(`unauthorize`);
        error.unauthorized = true;
        throw error;
    },
    delete: function (uid) {
        if (_loggedUsers.hasOwnProperty(uid)) {
            delete _loggedUsers[uid];
        }
    },
    write: function () {
        cache.store = _loggedUsers;
    }
};