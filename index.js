const express = require("express"), app = express(), fs = require("fs"), chalk = require("chalk"), config = require("./config/config.json"), emoji = require("./misc/emoji_list.json"),
internals = {
    version:"0.0.4 RELEASE",
    types: {
        a:"INFO",
        b:"REQUEST",
        c:"WARN"
    }
};
let dE = new Date(), startTime = dE.getTime(), endTime, modules = [];

// Clear console before printing anything
console.clear();

fs.readFile('./misc/ascii.txt', function(err, data) {
    if (err) throw err;
    // Generate the banner
    let asciiOut = data.toString()
    .replace("|replaceVersion|", `${chalk.yellow("Version:")} ${chalk.cyan(internals.version)}`)
    .replace("|titlecard|", chalk.yellow("The web server made for EUS"))
    .replace("DEV", chalk.red("DEV")).replace("RELEASE", chalk.green("RELEASE"))
    .replace("|replaceType|", `${chalk.yellow("Type: ")}${chalk.cyan(config.server.instance_type)}`);
    // Print the banner
    console.log(asciiOut);
    // Get the modules from the ./modules folder
    fs.readdir("./modules", (err, files) => {
        if (err) throw err;
        for (var i = 0; i < files.length; i++) {
            /*
                For every file in the array, output that it was found 
                in the console and attempt to load it using require.
                Oh, and check that it has .js in it's file name!
            */
            if (files[i].includes(".js")) {
                modules[files[i].toString().replace(".js", "")] = require(`./modules/${files[i].toString()}`);
                console.log(`[Modules] Found module ${files[i].toString()}`);
            } else {
                console.log(`[Modules] Found file ${files[i]}. It is not a module.`)
            }
        }
        modules.logger.log(internals.types.a, emoji.wave, "Starting Revolution...");
        server();
    });
});

function server() {
    app.get('*', (req, res) => { modules.request_handler.handle(modules, internals, emoji, req, res); });
    app.listen(config.server.port, () => { dE = new Date(), endTime = dE.getTime();
        modules.logger.log(internals.types.a, emoji.thumb_up, `Started Revolution on port ${config.server.port}! Took ${endTime - startTime}ms`);
    });
}