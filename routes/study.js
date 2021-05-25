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
            payload: request.body
        };
        options.user_id = request.user.id;
        var r = await dataAccess.study.create(options);

        reply.send(r);

    });

}


module.exports = routes