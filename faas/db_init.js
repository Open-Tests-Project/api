"use strict";

const path = require("path");
const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));



(async function () {

    try {

        const availableTests = await dataAccess.sqlite.available_tests.read();

        if (availableTests.length === 0) {
            const createAvailableTestPayload = {
                test_name: "iat",
                test_label: "Implicit Association Test",
                test_default_attributes: JSON.stringify({
                    death_suicide: require(path.resolve(process.cwd(), "fixtures", "iat", "death_suicide.json")),
                    gender_career: require(path.resolve(process.cwd(), "fixtures", "iat", "gender_career.json")),
                    leadership: require(path.resolve(process.cwd(), "fixtures", "iat", "leadership.json"))
                })
            };
            console.log(await dataAccess.sqlite.available_tests.create(createAvailableTestPayload));

        }
        console.log("available_tests", (await dataAccess.sqlite.available_tests.read()).length);

        dataAccess.sqlite.close(function (err) {
            if (err) {
                console.log(err);
            } else {
                process.exit(0);
            }
        });

    } catch (e) {
        console.error(e);
        process.exit(1);
    }

})();