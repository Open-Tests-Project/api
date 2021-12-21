"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
const schemas = require(path.resolve(process.cwd(), "schemas"));

async function routes (fastify, options) {

    fastify.post('/study/:test_name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.test
        }
    }, async function (request, reply) {

        var options = {
            payload: request.body,
            user_id: request.user.id
        };

        var result = await dataAccess.study.create(options);
        reply.send(result);

    });

    fastify.get('/study/:test_name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.test
        }
    }, async function (request, reply) {
        var options = {
            test_name: request.params.test_name,
            user_id: request.user.id
        };

        var result = await dataAccess.study.read(options);
        reply.send(result);

    });
    fastify.delete('/study/:test_name/:study_name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.test
        }
    }, async function (request, reply) {

        var options = {
            test_name: request.params.test_name,
            study_name: request.params.study_name,
            user_id: request.user.id
        };

        var result = await dataAccess.study.delete(options);
        reply.send(result);

    });

}


module.exports = routes