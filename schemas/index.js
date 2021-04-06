"use strict";


module.exports = {
    auth: {
        type: "object",
        required: ["email", "password"],
        properties: {
            email : { type: 'string' },
            password: { type: 'string' }
        }
    }
};