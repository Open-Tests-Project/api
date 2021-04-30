"use strict";

const path = require("path");
const dataAccess = require(path.resolve(process.cwd(), "data_access", "index"));


(async function () {

    try {
        const IAT = "iat";
        var availableTests = await dataAccess.tests.list();
        if (availableTests.length === 0) {

            await dataAccess.tests.add(IAT);

        }
        console.log("available_tests", await dataAccess.tests.list());

        var iatTest = await dataAccess.tests.get({
            test_name: IAT
        });
        if (!iatTest) {
            await dataAccess.tests.create({
                test_name: IAT,
                payload: {
                    death_suicide: require(path.resolve(process.cwd(), "fixtures", "iat", "death_suicide.json")),
                    gender_career: require(path.resolve(process.cwd(), "fixtures", "iat", "gender_career.json")),
                    leadership: require(path.resolve(process.cwd(), "fixtures", "iat", "leadership.json"))
                }
            })
        }

        iatTest = await dataAccess.tests.get({
            test_name: IAT
        });
        console.log(JSON.stringify(iatTest, null, 2));


        await dataAccess.quitConnection();
    } catch (e) {
        console.error(e);
    }

})();