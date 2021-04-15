"use strict";


// var server = require("http").Server();
// var io = require("socket.io")(server);
//
// io.on("connection", function(socket) {
//     console.log("a user connected: " + socket.id);
//
//
// });
//
// server.listen(4444);
// console.log("socket server listen on " + 4444);

// const io = require("socket.io")(4444);
//
//
// io.on("connection", socket => {
//
//     console.log("a user connected: " + socket.id);
//     // either with send()
//     socket.send("Hello!");
//
//     // or with emit() and custom event names
//     socket.emit("greetings", "Hey!", { "ms": "jane" }, Buffer.from([4, 3, 3, 1]));
//
//     // handle the event sent with socket.send()
//     socket.on("message", (data) => {
//         console.log(data);
//     });
//
//     // handle the event sent with socket.emit()
//     socket.on("salutations", (elem1, elem2, elem3) => {
//         console.log(elem1, elem2, elem3);
//     });
// });
// console.log("socket server listen on " + 4444);


var server = require("http").Server();
var io = require("socket.io")(server);

/**
 * A gateway that allow bidirectional communication between clients and the backend.
 * Used protocols:
 * - websocket: clients <-> gateway
 * - http: gateway <-> microservices (Giulio API)
 */
io.on("connection", function(socket) {
    console.log("a user connected: " + socket.id);


    socket.on("READ_USER", function () {
        var user = {"email":"simone","role":"admin","scope":""};
        socket.emit("READ_USER_RESULT", user)
    })
});

io.use((socket, next) => {
    console.log(1);
    console.log(socket.request.headers.cookie);
    next();
    // if (isValid(socket.request)) {
    //     next();
    // } else {
    //     next(new Error("invalid"));
    // }
});
io.use((socket, next) => {
    console.log(2);
    var token = socket.request.headers.cookie["otp-token"];
    // if the token is not valid
    // next(new Error("unauthorized"));
    // if (isValid(socket.request)) {
    //     next();
    // } else {
    //     next(new Error("invalid"));
    // }
});


server.listen(3002);
console.log("socket server listen on 4444" );