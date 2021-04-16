"use strict";

const path = require("path");
const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));


(async function () {

    try {
        await dataAccess.test.add("iat");
        console.log("available_tests", await dataAccess.test.list());
        await dataAccess.quitConnection();
    } catch (e) {

    }

})();