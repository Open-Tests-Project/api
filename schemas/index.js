"use strict";


module.exports = {
    auth: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email : { type: 'string' },
            password: { type: 'string' }
        },
        additionalProperties: false
    },
    test: {
        type: "object",
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            },
            test_name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            }
        },
        additionalProperties: false
    },
    delete_study: {
        type: "object",
        required: ["study_name", "test_name"],
        properties: {
            study_name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            },
            test_name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            }
        },
        additionalProperties: false
    }
};