"use strict";

var path = require("path");
var sqliteFile = path.resolve(process.cwd(), "otp.sqlite");
var queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));
var sqlite3 = require("sqlite3").verbose();


var db = new sqlite3.Database(sqliteFile, (err) => {
    if (err) {
        throw err;
    }

    db.get("PRAGMA foreign_keys = ON");

    // JSON1
    // https://www.sqlite.org/json1.html#jmini
    // db.run("DROP TABLE IF EXISTS studies");
    db.run(queries.users.create_table_if_not_exists);
    db.run(queries.studies.create_table_if_not_exists);
    db.run(queries.available_tests.create_table_if_not_exists);
    db.run(queries.tests.create_table_if_not_exists);
    db.run(queries.patients.create_table_if_not_exists);


});




// db.on("trace", function (query) {
//     console.log(query)
// })
// db.on("profile", function (query) {
//     console.log(query)
// })

module.exports = db;