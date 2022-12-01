"use strict";

var path = require("path");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));

function _read (db) {
    return function (options) {
        return new Promise(function (resolve, reject) {
            db.get(queries.tests.read, [
                options.test_name
            ], function (error, row) {
                if (error) {
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
    }
}

module.exports = function (db) {

    return {


        read: _read(db),

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

        },

        readAttributes: async function (options) {

            const attributes = await _read(db)({
                test_name: options.test_name
            });

            if (attributes.hasOwnProperty(options.test_type)) {
                const test = attributes[options.test_type];
                if (test.hasOwnProperty(options.lang)) {
                    return test[options.lang]
                }
            }
            return {};


            // test_name: request.body.test_name,
            //     test_type: request.body.test_type,
            //     lang: request.body.lang
            // return new Promise(function (resolve, reject) {
            //     db.get(queries.tests.update_attributes, [
            //         JSON.stringify(options.test_attributes),
            //         options.study_id,
            //         options.user_id,
            //     ], function (error, rows) {
            //         if (error) {
            //             reject(error);
            //         } else {
            //             resolve(this)
            //         }
            //     });
            //
            // });

        }

    };

};