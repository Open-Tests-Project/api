"use strict";


module.exports = {
    currentDatetime: function () {
        var now = new Date();
        return now.getFullYear() + "-" +
            (parseInt(now.getMonth(), 10) + 1) + "-" +
            now.getDate() + " " +
            now.getHours().toString().padStart(2, '0') + ":" +
            now.getMinutes().toString().padStart(2, '0') + ":" +
            now.getSeconds().toString().padStart(2, '0');

    }
};