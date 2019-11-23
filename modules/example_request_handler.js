const fs = require("fs"),
emoji = require("../misc/emoji_list.json");

// Defines the function of this module
const MODULE_FUNCTION = "handle_requests",

// Base path for module folder creation and navigation
BASE_PATH = "/example_request_handler";

// Only ran on startup so using sync functions is fine
// Makes the folders for files of the module
if (!fs.existsSync(__dirname + BASE_PATH)) {
    fs.mkdirSync(__dirname + BASE_PATH);
}
if (!fs.existsSync(__dirname + BASE_PATH + "/files")) {
    fs.mkdirSync(__dirname + BASE_PATH + "/files");
}

module.exports = {
    get:function(req, res) {
        /*
            req - Request from client
            res - Response from server
        */
        
        fs.access(__dirname + BASE_PATH + "/files" + req.url, fs.F_OK, error => {
            if (error) {
                global.modules.consoleHelper.printWarn(emoji.page, `${req.method}: ${req.url} was requested - Returned 404`);
                res.status(404).send("404!<hr>Revolution");
            } else {
                global.modules.consoleHelper.printInfo(emoji.page, `${req.method}: ${req.url} was requested`);
                res.sendFile(__dirname + BASE_PATH + "/files" + req.url);
            }
        });
    },
    post:function(req, res) {
        /*
            req - Request from client
            res - Response from server
        */

        // Anything that needs to be done with a post can be done here.
    }
}

module.exports.MOD_FUNC = MODULE_FUNCTION;