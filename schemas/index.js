"use strict";


module.exports = {
    auth: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email : { type: 'string' },
            password: { type: 'string' }
        }
    },
    test: {
        type: "object",
        properties: {
            name: {
                type: "string",
                minLength: 3,
                maxLength: 256
            }
        }
    }
};