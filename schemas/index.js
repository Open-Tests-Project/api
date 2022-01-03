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
    tests: {
        update_attributes: {
            params: {
                type: "object",
                required: ["study_id"],
                properties: {
                    study_id: {
                        type: "integer",
                        minimum: 1
                    }
                },
                additionalProperties: false
            },
            body: {
                type: "object",
                required: ["test_attributes"],
                properties: {
                    test_attributes: {
                        type: "object"
                    }
                },
                additionalProperties: false
            }
        }
    },
    get_study: {
        params: {
            type: "object",
            required: ["test_name", "test_type", "lang"],
            properties: {
                test_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
                test_type: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
                lang: {
                    type: "string",
                    minLength: 3,
                    maxLength: 3
                }
            },
            additionalProperties: false
        }
    },
    create_study: {
        body: {
            type: "object",
            required: ["study_name", "test_type", "lang", "test_name"],
            properties: {
                study_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
                test_type: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
                lang: {
                    type: "string",
                    minLength: 3,
                    maxLength: 3
                },
                test_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                },
            },
            additionalProperties: false
        }
    },
    delete_study: {
        type: "object",
        required: ["study_id"],
        properties: {
            study_id: {
                type: "integer",
                minimum: 1
            }
        },
        additionalProperties: false
    },
    rename_study: {
        params: {
            type: "object",
            required: ["study_id"],
            properties: {
                study_id: {
                    type: "integer",
                    minimum: 1
                }
            },
            additionalProperties: false
        },
        body: {
            type: "object",
            required: ["study_name"],
            properties: {
                study_name: {
                    type: "string",
                    minLength: 3,
                    maxLength: 256
                }
            },
            additionalProperties: false
        }
    }

};