"use strict";
const fs = require("fs");
const chalk = require("chalk");
let d = new Date();

module.exports = {
    log: function(type, emoji, text) {
        d = new Date();
        console.log(`${chalk.green(`[${timeNumbers(d.getHours())}:${timeNumbers(d.getMinutes())}:${timeNumbers(d.getSeconds())} - ${type}]`)} ${emoji} ${text}`)
    }
}

function timeNumbers(inp) {
    if (inp == 0) {
        return "00";
    } else if (inp == 1) {
        return "01";
    } else if (inp == 2) {
        return "02";
    } else if (inp == 3) {
        return "03";
    } else if (inp == 4) {
        return "04";
    } else if (inp == 5) {
        return "05";
    } else if (inp == 6) {
        return "06";
    } else if (inp == 7) {
        return "07";
    } else if (inp == 8) {
        return "08";
    } else if (inp == 9) {
        return "09";
    } else {
        return inp;
    }
}