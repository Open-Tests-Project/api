"use strict";

const path = require("path");
const url = require("url");

const shared = require(path.resolve(process.cwd(), "shared"));
const schemas = require(path.resolve(process.cwd(), "schemas"));
const config = require(path.resolve(process.cwd(), "config"));
const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));

const HOST = url.parse(config.BASE_URL).host;
const cookieOptions = {
    domain: HOST,
    path: '/',
    secure: true, // send cookie over HTTPS only
    httpOnly: true,
    sameSite: true // alternative CSRF protection
};
const COOKIE_NAME = shared.COOKIE_NAME;

async function routes (fastify, options) {


    fastify.post("/signin/:type", {
        schema: {
            body: schemas.auth
        }
    }, async function (request, reply) {

        const user = await dataAccess.user.login(request.body);
        const token = fastify.jwt.sign(user);

        if (request.params.type === "web") {
            reply.setCookie(COOKIE_NAME, token, cookieOptions);
        }

        return reply.status(201).send({ token });

    });

    fastify.post("/signup/:type", {
        schema: {
            body: schemas.auth
        }
    }, async function (request, reply) {

        const user = await dataAccess.user.create(request.body);
        const token = fastify.jwt.sign(user);
        if (request.params.type === "web") {
            reply.setCookie(COOKIE_NAME, token, cookieOptions);
        }
        return reply.status(201).send({ token });

    });
}


module.exports = routes