"use strict";

const axios = require('axios');

// axios({
//     url: "http://simonedev/myapi/signup",
//     method: "post",
//     data: {
//         email: "ciao",
//         password: "ciao"
//     }
// })
//     .then(function (response) {
//         // handle success
//         console.log(response.status);
//         console.log(response.data);
//     })
//     .catch(function (error) {
//         // handle error
//         console.log(error.response.status);
//         console.log(error.response.data);
//     })
// ;


const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImVtYWlsIjoic2ltb25lNCJ9LCJpYXQiOjE2MTc3MjM1NTd9.6GnkEslVCrcvo6ogNtSLbyNdBNdwk08YupD6Y8g4un0";
axios({
    url: "http://simonedev/myapi/cv/visitcounter",
    method: "get",
    headers: {
        authorization: "Bearer " + TOKEN,
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