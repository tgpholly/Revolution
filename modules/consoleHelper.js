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
// Creates the consoleHelper config file
if (!fs.existsSync(__dirname + BASE_PATH + "/config.json")) {
    fs.writeFileSync(__dirname + BASE_PATH + "/config.json", JSON.stringify({"24hour":true}));
    console.log(`[consoleHelper] Made consoleHelper config file`);
}

// Load in config
const config = require(__dirname + BASE_PATH + "/config.json");

module.exports = {
    // Prints a bit of information to the console
    printInfo:function(emoji, s) {
        console.log(chalk.green(`[${this.getTime24()}] `)+chalk.bgGreen(chalk.black(" INFO "))+` ${emoji} ${s}`);
    },

    // Prints a warning to the console
    printWarn:function(emoji, s) {
        console.warn(chalk.green(`[${this.getTime24()}] `)+chalk.bgYellow(chalk.black(" WARN "))+` ${emoji} ${s}`);
    },

    // Prints an error to the console
    printError:function(emoji, s) {
        console.error(chalk.green(`[${this.getTime24()}] `)+chalk.bgRed(chalk.black(" ERROR "))+` ${emoji} ${s}`);
    },

    getTime24:function() {
        const time = new Date();
        // Check if the user wants 24 hour or 12 hour time
        if (config["24hour"]) {
            // User wants 24 hour time, leave it as it is.
            return `${correctValue(time.getHours())}:${correctValue(time.getMinutes())}:${correctValue(time.getSeconds())}`;
        } else {
            // User wants 12 hour time, process it for that.
            return this.t2412(`${correctValue(time.getHours())}:${correctValue(time.getMinutes())}:${correctValue(time.getSeconds())}`);
        }
    },

    // Function for converting 24 hour to 12 hour time
    t2412:function(inp) {
        // Check what time it is, AM or PM.
        if (parseInt(inp.split(":")[0]) > 11) {
            // It's over 11 so it's PM
            const i = inp.split(":");
            let i1 = parseInt(i[0]) - 12;
            if (i1 == 0) i1 = 12;
            return i1 + ":" + i[1] + " PM";
        } else {
            // It's lower than 12 so it's AM
            const i = inp.split(":");
            let i1 = parseInt(i[0]);
            if (i1 == 0) i1 = 12;
            return i1 + ":" + i[1] + " AM";
        }
    }
}

module.exports.MOD_FUNC = MODULE_FUNCTION;

// Date returns numbers without a 0 in front of them of course so this adds them.
function correctValue(i) {
    if (i < 10) {
        return "0"+i;
    } else {
        return i;
    }
}