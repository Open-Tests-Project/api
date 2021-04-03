"use strict";


var path = require("path");
var config = require(path.resolve(process.cwd(), "config"));
var redis =  require(path.resolve(process.cwd(), "redis"));


const fastify = require('fastify')({
    logger: false
});
  
// http://zsimo.it/api/cv/visitcounter
fastify.get('/cv/visitcounter', function (request, reply) {
    redis.incr("cv/visitcounter", function (err, res) {

        if (err) {
            reply.code(400).send({'Bad request': ""})
        } else {
            reply.send({ visitcounter: res });
        }

    });
    
});


fastify.get("/", function (request, reply) {
    reply.send("dd");
});
fastify.get("/ciao", function (request, reply) {
    reply.send("ciao");
});
fastify.get("/ping", function (request, reply) {
    reply.send("pong");
});


// Run the server!
fastify.listen(config.HTTP_PORT, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    // fastify.log.info(`server listening on ${address}`)
    console.log(`server listening on ${address}`);
});

console.log("ok")