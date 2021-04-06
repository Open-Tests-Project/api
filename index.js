"use strict";


var path = require("path");
var config = require(path.resolve(process.cwd(), "config"));



const fastify = require('fastify')({
    logger: false
});

fastify.register(require(path.resolve(process.cwd(), "routes", "auth")));
fastify.register(require(path.resolve(process.cwd(), "routes", "index")));

fastify.setErrorHandler(function (error, request, reply) {

    if (error.validation) {
        return reply.status(400).send(error);
    }

    const IS_PROD = false;
    if (IS_PROD) {
        reply.code(418).send({msg: "generic"});
    } else {
        reply.status(500).send(error);
    }
})

fastify.ready(() => {
    console.log(fastify.printRoutes())
});


// Run the server!
fastify.listen(config.HTTP_PORT, function (err, address) {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    // fastify.log.info(`server listening on ${address}`)
    console.log(`server listening on ${address}`);
});
