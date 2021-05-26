"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
const schemas = require(path.resolve(process.cwd(), "schemas"));

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/tests', {
        preValidation: [fastify.authenticate, fastify.authorize]
    }, async function (request, reply) {

        var tests = await dataAccess.tests.list();
        reply.send(tests);
        
    });
    fastify.get('/test/:name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.test
        }
    }, async function (request, reply) {
        var test = await dataAccess.tests.read({
            test_name: request.params.name
        });
        reply.send(test || {});

    });

}


module.exports = routes