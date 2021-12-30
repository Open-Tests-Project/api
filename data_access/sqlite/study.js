"use strict";

var path = require("path");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));

module.exports = function (db) {

    return {

        create: function (options) {

            return new Promise(function (resolve, reject) {


                db.run(queries.studies.create, [
                    options.user_id,
                    options.study_name
                ], function (error, a) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this)
                    }
                });

            });

        },
        rename: function (options) {

            return new Promise(function (resolve, reject) {
                db.run(queries.studies.rename, [
                    options.study_name,
                    options.study_id,
                    options.user_id,
                ], function (error, a) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(this)
                    }
                });

            });

        },
        // used in test only
        // read: function (options) {
        //
        //     return new Promise(function (resolve, reject) {
        //         db.all(queries.studies.read, [],function (error, rows) {
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
                db.run(queries.studies.delete, [
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

        // read_test: function (options) {
        //
        //     return new Promise(function (resolve, reject) {
        //
        //
        //         db.run(queries.studies.read_test, [
        //             options.user_id,
        //             options.study_name
        //         ], function (error, rows) {
        //             if (error) {
        //                 reject(error);
        //             } else {
        //                 resolve(this)
        //             }
        //         });
        //
        //     });
        //
        // },
        search: function (options) {

            return new Promise(function (resolve, reject) {

                db.all(queries.tests_studies.search, [
                    options.user_id,
                    options.test_name,
                    options.test_type,
                    options.lang
                ], function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows.map(function (row) {
                            try {
                                row.test_attributes = JSON.parse(row.test_attributes);
                            } catch (e) {}
                            return row;
                        }));
                    }
                });

            });


        },
        search_by_id: function (options) {

            return new Promise(function (resolve, reject) {

                db.all(queries.tests_studies.search_by_study_id, [
                    options.study_id
                ], function (error, rows) {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(rows.map(function (row) {
                            try {
                                row.test_attributes = JSON.parse(row.test_attributes);
                            } catch (e) {}
                            return row;
                        })[0]);
                    }
                });

            });

        }

    };
};