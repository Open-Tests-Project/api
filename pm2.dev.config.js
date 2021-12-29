"use strict";

var config = require("./config");

module.exports = {
  apps: [
    {
      "name": "dev:" + config.APP_NAME + "-http",
      "script": "./node_modules/.bin/nodemon ./index.js --config nodemon.json",
      // "ignore_watch": [
      //     "node_modules",
      //     "logs",
      //     ".git",
      //     "ciccio",
      //     "db",
      //     "db/db.sqlite-journal"
      // ],
      "env": {
        "NODE_ENV": "development",
      },
      "error_file": "./logs/pm2/dev_http.error.log",
      "namespace": config.APP_NAME
    }
  ]
};