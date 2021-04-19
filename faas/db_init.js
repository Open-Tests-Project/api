"use strict";

const path = require("path");
const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));


(async function () {

    try {
        var availableTests = await dataAccess.tests.list();
        if (availableTests.length === 0) {
            await dataAccess.tests.add("iat");
        }
        console.log("available_tests", await dataAccess.tests.list());

        await dataAccess.quitConnection();
    } catch (e) {

    }

})();