"use strict";

var path = require("path");
var dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));
const schemas = require(path.resolve(process.cwd(), "schemas"));

async function routes (fastify, options) {

    // create new study
    fastify.post('/studies', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.create_studyo
    }, async function (request, reply) {

        // var redisOptions = {
        //     lang: request.body.lang,
        //     study_name: request.body.study_name,
        //     test_name: request.body.test_name,
        //     test_type: request.body.test_type,
        //     user_id: request.user.id
        // };
        // old redis stuff
        // var result = await dataAccess.redis.study.create(redisOptions);

        const createStudyOptions = {
            study_name: request.body.study_name,
            user_id: request.user.id
        };

        const studyResult = await dataAccess.sqlite.studies.create(createStudyOptions);
        const newStudyId = studyResult.lastID;

        const readAttributesOptions = {
            test_name: request.body.test_name,
            test_type: request.body.test_type,
            lang: request.body.lang
        };

        const createTestOptions = {
            study_id: newStudyId,
            test_name: request.body.test_name,
            test_type: request.body.test_type,
            lang: request.body.lang,
            attributes: await dataAccess.sqlite.tests.readAttributes(readAttributesOptions)
        };
        await dataAccess.sqlite.tests.create(createTestOptions);

        // read the just created study
        const newStudy = await dataAccess.sqlite.studies.search_by_id({
            study_id: newStudyId
        });

        reply.send(newStudy);

    });

    fastify.get('/studies/:test_name', {
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
    fastify.get('/studies/test/:test_name/type/:test_type/lang/:lang', {
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
        var result = await dataAccess.sqlite.studies.search(options);
        reply.send(result);

    });
    fastify.delete('/studies/:study_id', {
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
        await dataAccess.sqlite.studies.delete(options);
        reply.send(options);

    });
    // rename study
    fastify.put('/studies/:study_id', {
        preValidation: [fastify.authenticate, fastify.authorize],
        schema: schemas.rename_study
    }, async function (request, reply) {

        var options = {
            study_id: request.params.study_id,
            study_name: request.body.study_name,
            user_id: request.user.id
        };

        var result = await dataAccess.sqlite.studies.rename(options);
        reply.send({
            study_id: result.lastID,
            study_name: options.study_name
        });

    });

}


module.exports = routes