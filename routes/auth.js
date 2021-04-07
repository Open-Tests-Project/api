"use strict";

var path = require("path");
var schemas = require(path.resolve(process.cwd(), "schemas"));
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));

async function routes (fastify, options) {


    fastify.post("/signin", {
        schema: {
            body: schemas.auth
        }
    }, async function (request, reply) {

        const user = await dataAccess.user.login(request.body);

        const token = fastify.jwt.sign({ user });
        return reply.status(201).send({ token });
    });

    fastify.post("/signup", {
        schema: {
            body: schemas.auth
        }
    }, async function (request, reply) {

        const user = await dataAccess.user.create(request.body);
        const token = fastify.jwt.sign({ user });
        return reply.status(201).send({ token });

    });
}


module.exports = routes