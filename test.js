"use strict";

const axios = require('axios');

axios({
    url: "http://simonedev/myapi/signup",
    method: "post",
    data: {
        email: "ciao",
        password: "ciao"
    }
})
    .then(function (response) {
        // handle success
        console.log(response.status);
        console.log(response.data);
    })
    .catch(function (error) {
        // handle error
        console.log(error.response.status);
        console.log(error.response.data);
    })
;