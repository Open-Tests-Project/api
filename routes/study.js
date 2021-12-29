"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
const schemas = require(path.resolve(process.cwd(), "schemas"));

async function routes (fastify, options) {

    // create new study
    fastify.post('/study', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.create_studyo
    }, async function (request, reply) {

        var redisOptions = {
            lang: request.body.lang,
            study_name: request.body.study_name,
            test_name: request.body.test_name,
            test_type: request.body.test_type,
            user_id: request.user.id
        };

        var createStudyOptions = {
            study_name: request.body.study_name,
            user_id: request.user.id
        };


        // old redis stuff
        var result = await dataAccess.redis.study.create(redisOptions);

        var studyResult = await dataAccess.sqlite.study.create(createStudyOptions);
        var newStudyId = studyResult.lastID;

        var readAttributesOptions = {
            test_name: request.body.test_name,
            test_type: request.body.test_type,
            lang: request.body.lang
        };
        var createTestOptions = {
            study_id: newStudyId,
            test_name: request.body.test_name,
            test_type: request.body.test_type,
            lang: request.body.lang,
            attributes: await dataAccess.redis.study.readAttributes(readAttributesOptions)
        };
        await dataAccess.sqlite.test.create(createTestOptions);

        // read the just created study
        var newStudy = await dataAccess.sqlite.study.search_by_id({
            study_id: newStudyId
        });

        reply.send(newStudy);

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

        var result = await dataAccess.redis.study.read(options);
        reply.send(result);

    });
    fastify.get('/study/test/:test_name/type/:test_type/lang/:lang', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.get_study
    }, async function (request, reply) {
        var options = {
            test_name: request.params.test_name,
            test_type: request.params.test_type,
            lang: request.params.lang,
            user_id: request.user.id
        };

        var result = await dataAccess.redis.study.read(options);
        var result = await dataAccess.sqlite.study.search(options);
        reply.send(result);

    });
    fastify.delete('/study/:study_id', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: {
            params: schemas.delete_study
        }
    }, async function (request, reply) {

        // var options = {
        //     test_name: request.params.test_name,
        //     study_name: request.params.study_name,
        //     user_id: request.user.id
        // };
        //
        // var result = await dataAccess.redis.study.delete(options);
        // reply.send(result);

        var studyId = request.params.study_id;
        var options = {
            study_id: studyId
        };
        await dataAccess.sqlite.study.delete(options);
        // todo simone FOREIGN KEY on tests does not work via node
        // it works using DB browser desktop app
        await dataAccess.sqlite.test.delete(options);
        reply.send(options);

    });
    // rename study
    fastify.put('/study/:test_name/:old_name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.rename_study
    }, async function (request, reply) {
        var options = {
            test_name: request.params.test_name,
            old_name: request.params.old_name,
            new_name: request.body.new_name,
            user_id: request.user.id
        };

        var result = await dataAccess.redis.study.rename(options);
        reply.send(result);

    });
    // update study
    fastify.put('/study/:test_name/:old_name', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.rename_study
    }, async function (request, reply) {
        var options = {
            test_name: request.params.test_name,
            old_name: request.params.old_name,
            new_name: request.body.new_name,
            user_id: request.user.id
        };

        var result = await dataAccess.redis.study.rename(options);
        reply.send(result);

    });

}


module.exports = routes