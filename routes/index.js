"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/:page/visitcounter', {
        preValidation: [fastify.authenticate, fastify.authorize]
    }, async function (request, reply) {

        var counter = await dataAccess.utils.incr("cv/visitcounter");
        reply.send({ visitcounter: counter });

    });


    fastify.get('/:page/private', {
        preValidation: [fastify.authenticate, fastify.authorize]
    }, async function (request, reply) {

        reply.send("ok");

    });

    fastify.get("/whoami", {
        preValidation: [fastify.authenticate]
    }, function (request, reply) {
        const user = request.user;
        reply.send({
            email: user.email,
            role: user.role,
            scope: user.scope
        });
    });

    fastify.get("/ping", function (request, reply) {
        reply.send("pong");
    });
}


module.exports = routes