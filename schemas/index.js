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
    create_study: {
        type: "object",
        required: ["test_name"],
        properties: {
            test_name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            }
        },
        body: {
            type: "object"
        }
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
    },
    rename_study: {
        params: {
            type: "object",
            required: ["test_name", "old_name"],
            properties: {
                test_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
                old_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                }
            },
            additionalProperties: false
        },
        body: {
            type: "object",
            required: ["new_name"],
            properties: {
                new_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                }
            },
            additionalProperties: false
        }
    }

};