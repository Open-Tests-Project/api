"use strict";

var config = require("./config");

module.exports = {
  apps: [
    {
      "name": "dev:" + config.APP_NAME + "-http",
      "script": "./index.js",
      "watch": true,
      "ignore_watch": [
          "node_modules",
          "logs",
          ".git"
      ],
      "env": {
        "NODE_ENV": "development",
      },
      "error_file": "./logs/pm2/dev_http.error.log",
      "namespace": config.APP_NAME
    }
  ]
};