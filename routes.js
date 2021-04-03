"use strict";

var path = require("path");
var redis = require(path.resolve(process.cwd(), "redis"));

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/cv/visitcounter', function (request, reply) {
        redis.incr("cv/visitcounter", function (err, res) {

            if (err) {
                reply.code(400).send({'Bad request': ""})
            } else {
                reply.send({ visitcounter: res });
            }

        });

    });


    fastify.get("/ping", function (request, reply) {
        reply.send("pong");
    });
}


module.exports = routes