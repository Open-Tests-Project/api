"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/tests', {
        preValidation: [fastify.authenticate, fastify.authorize]
    }, async function (request, reply) {

        var tests = await dataAccess.tests.list();
        reply.send(tests);

    });

}


module.exports = routes