"use strict";

var path = require("path");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));

module.exports = function (db) {

    return {


        read: function (options) {
            return new Promise(function (resolve, reject) {
                db.get(queries.tests.read, [
                    options.test_name
                ], function (error, row) {
                    if (error) {
                        console.log(error);
                        reject(error);
                    } else {
                        try {
                            resolve(JSON.parse(row.test_default_attributes));
                        } catch (e) {
                            resolve({});
                        }

                    }
                });

            });
        },

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
        update_attributes: function (options) {

            return new Promise(function (resolve, reject) {
                db.run(queries.tests.update_attributes, [
                    JSON.stringify(options.test_attributes),
                    options.study_id,
                    options.user_id,
                ], function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this)
                    }
                });

            });

        }

    };

};