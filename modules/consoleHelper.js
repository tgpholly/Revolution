const chalk = require("chalk"),
fs = require("fs");

// Defines the function of this module
const MODULE_FUNCTION = "handle_console",

// Base path for module folder creation and navigation
BASE_PATH = "/consoleHelper";

// Only ran on startup so using sync functions is fine
// Makes the folders for files of the module
if (!fs.existsSync(__dirname + BASE_PATH)) {
    fs.mkdirSync(__dirname + BASE_PATH);
    console.log(`[consoleHelper] Made consoleHelper module folder`);
}
if (!fs.existsSync(__dirname + BASE_PATH + "/config.json")) {
    fs.writeFileSync(__dirname + BASE_PATH + "/config.json", JSON.stringify({"24hour":true}));
    console.log(`[consoleHelper] Made consoleHelper config file`);
}

const config = require(__dirname + BASE_PATH + "/config.json");

module.exports = {
    printInfo:function(emoji, s) {
        console.log(chalk.green(`[${this.getTime24()}] `)+chalk.bgGreen(chalk.black(" INFO "))+` ${emoji} ${s}`);
    },

    printWarn:function(emoji, s) {
        console.warn(chalk.green(`[${this.getTime24()}] `)+chalk.bgYellow(chalk.black(" WARN "))+` ${emoji} ${s}`);
    },

    printError:function(emoji, s) {
        console.error(chalk.green(`[${this.getTime24()}] `)+chalk.bgRed(chalk.black(" ERROR "))+` ${emoji} ${s}`);
    },

    getTime24:function() {
        const time = new Date();
        if (config["24hour"]) {
            return `${correctValue(time.getHours())}:${correctValue(time.getMinutes())}:${correctValue(time.getSeconds())}`;
        } else {
            return this.t2412(`${correctValue(time.getHours())}:${correctValue(time.getMinutes())}:${correctValue(time.getSeconds())}`);
        }
    },

    t2412:function(inp) {
        if (parseInt(inp.split(":")[0]) > 11) {
            const i = inp.split(":");
            let i1 = parseInt(i[0]) - 12;
            if (i1 == 0) i1 = 12;
            return i1 + ":" + i[1] + " PM";
        } else {
            const i = inp.split(":");
            let i1 = parseInt(i[0]);
            if (i1 == 0) i1 = 12;
            return i1 + ":" + i[1] + " AM";
        }
    }
}

module.exports.MOD_FUNC = MODULE_FUNCTION;

function correctValue(i) {
    if (i < 10) {
        return "0"+i;
    } else {
        return i;
    }
}