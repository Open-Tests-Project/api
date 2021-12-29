"use strict";

var path = require("path");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));

module.exports = function (db) {

    return {

        create: function (options) {

            return new Promise(function (resolve, reject) {

                db.run(queries.tests.create, [
                    options.study_id,
                    options.test_name,
                    options.test_type,
                    options.lang,
                    JSON.stringify(options.attributes),
                ], function (error) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this);
                    }
                });

            });

        },
        // used in test only
        // read: function () {
        //
        //     return new Promise(function (resolve, reject) {
        //         db.all(queries.tests.read, [],function (error, rows) {
        //             if (error) {
        //                 reject(error);
        //             } else {
        //                 resolve(rows)
        //             }
        //         });
        //
        //     });
        //
        // },
        delete: function (options) {

            return new Promise(function (resolve, reject) {
                db.run(queries.tests.delete, [
                    options.study_id
                ], function (error, a) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this)
                    }
                });

            });

        },


    };
};