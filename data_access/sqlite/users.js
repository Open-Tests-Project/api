"use strict";

const path = require("path");
const queries = require(path.resolve(process.cwd(), "data_access", "sqlite", "queries"));
const helpers = require(path.resolve(process.cwd(), "helpers"));
const bcrypt = require("bcrypt");

module.exports = function (db) {

    return {

        create: async function (payload) {

            const password = await bcrypt.hash(payload.password, 10);
            const createdAt = helpers.currentDatetime();

            return new Promise(function (resolve, reject) {
                // email, password, role, scope, created_at
                db.run(queries.users.create, [
                    payload.email,
                    password,
                    payload.role,
                    payload.scope,
                    createdAt
                ], function (error, rows) {
                    if (error) {
                        //var createError = new Error(`The user ${payload.email} already exists`);
                        // const createError = new Error(`The user ${payload.email} already exists`);
                        // createError.validation = true;
                        error.validation = true
                        reject(error);
                    } else {
                        //
                        // return {
                        //     email: payload.email,
                        //     id: userId,
                        //     role: "",
                        //     scope: ""
                        // };

                        console.log(rows)

                        resolve(this);
                    }
                });

            });

        },


        login: async function (payload) {
            const user = await HGETALL(keysFactory.user(payload.email));
            if (!user || !await bcrypt.compare(payload.password, user.password)) {
                var error = new Error(`Invalid credentials`);
                error.unauthorized = true;
                throw error;
            }
            return {
                email: user.email,
                id: user.id,
                role: user.role,
                scope: user.scope
            };

        }

    };

};