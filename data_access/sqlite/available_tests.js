"use strict";

var path = require("path");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));

module.exports = function (db) {

    return {

        read: function () {
            return new Promise(function (resolve, reject) {
                db.all(queries.available_tests.read, function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows || []);
                    }
                });

            });
        },
        create: function (payload) {
            return new Promise(function (resolve, reject) {

                db.run(queries.available_tests.create, [
                    payload.test_name,
                    payload.test_label,
                    payload.test_default_attributes,
                ], function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this);
                    }
                });

            });
        }

    };

};