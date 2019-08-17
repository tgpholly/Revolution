let dE = new Date();
var startTime = dE.getTime();
var endTime;

const express = require("express"),
app = express(),
randomstring = require("randomstring"),
fs = require("fs"),
chalk = require("chalk"),
busboy = require("connect-busboy");
const config = require("./config/config.json")
let modules = {};
console.clear();

fs.readFile('./misc/ascii.lol', function(err, data) {
    if (err) {
        throw err;
    }
    let asciiOut = data.toString()
    .replace("|replaceVersion|", `${chalk.yellow("Version:")} ${chalk.cyan(internals.version)}`)
    .replace("|titlecard|", chalk.yellow("The web server made for EUS"))
    .replace("DEV", chalk.red("DEV")).replace("RELEASE", chalk.green("RELEASE"))
    .replace("|replaceType|", `${chalk.yellow("Type: ")}${chalk.cyan(config.server.instance_type)}`);
    console.log(asciiOut);
    fs.readdir("./modules", (err, files) => {
        for (var i = 0; i < files.length; i++) {
            modules[files[i].toString().replace(".js", "")] = require(`./modules/${files[i].toString()}`);
            console.log(`[Modules] Found module ${files[i].toString()}`)
        }
        modules.logger.log(internals.types.a, emoji.wave, "Starting Revolution...");
        server();
    });
});
const emoji = require("./misc/emoji_list.json");
const internals = {
    version:"0.0.4 RELEASE",
    instance:"Dev Instance", //Deprecated, does absolutely nothing.
    types: {
        a:"INFO",
        b:"REQUEST",
        c:"WARN"
    }
}

function server() {
    app.get('*', (req, res) => {
        modules.request_handler.handle(modules, internals, emoji, req, res);
    });
    app.listen(config.server.port, () => {
        dE = new Date();
        endTime = dE.getTime();
        modules.logger.log(internals.types.a, emoji.thumb_up, `Started Revolution on port ${config.server.port}! Took ${endTime - startTime}ms`);
    });
}