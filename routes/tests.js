"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
const schemas = require(path.resolve(process.cwd(), "schemas"));

async function routes (fastify, options) {

    // http://zsimo.it/api/cv/visitcounter
    fastify.get('/tests', {
        preValidation: [fastify.authenticate, fastify.authorize]
    }, async function (request, reply) {

        var tests = await dataAccess.redis.test.list();
        reply.send(tests);
        
    });
    fastify.get('/tests/:name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.test
        }
    }, async function (request, reply) {

        // var test = await dataAccess.redis.test.read({
        //     test_name: request.params.name
        // });
        const test = await dataAccess.sqlite.tests.read({
            test_name: request.params.name
        });
        reply.send(test || {});

    });

    // update attributes
    fastify.put('/tests/:study_id', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.tests.update_attributes,
        bodyLimit: 12485760 // === 10MB
    }, async function (request, reply) {

        var options = {
            study_id: request.params.study_id,
            test_attributes: request.body.test_attributes,
            user_id: request.user.id
        };

        await dataAccess.sqlite.tests.update_attributes(options);
        reply.send({
            study_id: options.study_id,
            test_attributes: options.test_attributes
        });

    });

}


module.exports = routes