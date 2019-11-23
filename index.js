const express = require("express"),
fs = require("fs"),
chalk = require("chalk"),
config = require("./config/config.json"),
emoji = require("./misc/emoji_list.json");
global.actualDir = __dirname;
global.internals = {
    version:"Open Source",
};
global.app = express();
global.modules = [];
let dE = new Date(),
startTime = dE.getTime(),
endTime,
reqhandler;

// Clear console before printing anything
console.clear();

fs.readFile('./misc/ascii.txt', function(err, data) {
    if (err) throw err;
    // Generate and Print the banner
    console.log(highlightHeader(data));
    // Get the modules from the ./modules folder
    fs.readdir("./modules", (err, files) => {
        if (err) throw err;
        for (var i = 0; i < files.length; i++) {
            /*
                For every file in the array, output that it was found 
                in the console and attempt to load it using require.
                Oh, and check that it has .js in it's file name!
            */
            try {
                if (files[i].includes(".js")) {
                    console.log(`[Modules] Found module ${files[i].toString()}`);
                    global.modules[files[i].toString().replace(".js", "")] = require(`./modules/${files[i].toString()}`);
                    // We want to find out what the request handler module is
                    if (global.modules[files[i].toString().replace(".js", "")].MOD_FUNC == "handle_requests") {
                        // Set reqhandler to the request handler for easy getting
                        reqhandler = global.modules[files[i].toString().replace(".js", "")];
                    }
                } else {
                    if (files[i].split(".").length < 2) continue;
                    console.log(`[Modules] Found file ${files[i]}. It is not a module.`)
                }
            } catch (err) {
                console.log(chalk.bgRed(` ! [Modules] There was an issue loading ${files[i]} ! `));
                console.log(chalk.bgRed(` ! [Modules] ${err} ! `));
            }
        }
        global.modules.consoleHelper.printInfo(emoji.wave, "Starting Revolution...");
        server();
    });
});

function server() {
    reqhandler.extras();
    app.get('*', (req, res) => reqhandler.get(req, res));
    app.post('*', (req, res) => reqhandler.post(req, res));
    app.listen(config.server.port, () => {
        dE = new Date(),
        endTime = dE.getTime();
        global.modules.consoleHelper.printInfo(emoji.thumb_up, `Started Revolution on port ${config.server.port}! Took ${endTime - startTime}ms`);
    });
}

function highlightHeader(s) {
    const s1 = s.toString().replace("|replaceVersion|", `${chalk.yellow("Version:")} ${chalk.cyan(internals.version)}`)
    .replace("|titlecard|", chalk.yellow("A modular and fexible server"))
    .replace("|replaceType|", `${chalk.yellow("Instance: ")}${chalk.cyan(config.server.instance_type)}`);
    return s1;
}