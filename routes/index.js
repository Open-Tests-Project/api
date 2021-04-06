"use strict";

var path = require("path");

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/cv/visitcounter', {
        preValidation: [fastify.authenticate]
    }, function (request, reply) {

        // redis.incr("cv/visitcounter", function (err, res) {
        //
        //     if (err) {
        //         reply.code(400).send({'Bad request': ""})
        //     } else {
        //         reply.send({ visitcounter: res });
        //     }
        //
        // });

        reply.send({ visitcounter: 1 });

    });


    fastify.get("/ping", function (request, reply) {
        reply.send("pong");
    });
}


module.exports = routes