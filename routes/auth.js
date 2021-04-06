"use strict";

var path = require("path");
var schemas = require(path.resolve(process.cwd(), "schemas"));
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
console.log(dataAccess);

async function routes (fastify, options) {


    fastify.post("/signin", {
        schema: {
            body: schemas.auth
        }
    }, function (request, reply) {
        reply.send("signin");
    });

    fastify.post("/signup", {
        schema: {
            body: schemas.auth
        }
    }, async function (request, reply) {


        const user = await dataAccess.user.create(request.body)
        // const token = newToken(user)
        // return reply.status(201).send({ token })
        reply.send(user);


    });
}


module.exports = routes