"use strict";

var path = require("path");
var config = require(path.resolve(process.cwd(), "config"));

var retryStrategy = require("node-redis-retry-strategy")();
var redis = require("redis");

var redisOptions = {
    retry_strategy: retryStrategy,
    port: config.REDIS_PORT
};

var client = redis.createClient(redisOptions);
client.on("error", function(error) {
    console.error(error);
});
client.on("ready", function(error) {
    console.error("ready");
});
client.on("connect", function(error) {
    console.error("connect");
});

module.exports = client;