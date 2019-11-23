const chalk = require("chalk");

// Defines the function of this module
const MODULE_FUNCTION = "handle_console",

// Base path for module folder creation and navigation
BASE_PATH = null;

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
        return `${correctValue(time.getHours())}:${correctValue(time.getMinutes())}:${correctValue(time.getSeconds())}`
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