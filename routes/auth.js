"use strict";

var path = require("path");
var redis = require(path.resolve(process.cwd(), "redis"));

async function routes (fastify, options) {


    fastify.post("/signin", function (request, reply) {
        reply.send("signin");
    });
    fastify.post("/signup", function (request, reply) {
        reply.send("signup");
    });
}


module.exports = routes