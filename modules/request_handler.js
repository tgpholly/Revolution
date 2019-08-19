const fs = require("fs");

module.exports = {
    handle:function(modules, internals, emoji, req, res) {
        /*
            modules   - Modules that are loaded when Revolution starts
            internals - Predefined variables, e.g the version and lables like "INFO"
            emoji     - Pretty self explanitory, the list of emojis used in Revolution.
            req       - Request from client
            res       - Response from server
        */
        res.set("Server-Type", "Revolution");
        if (req.url == "/") {
            modules.logger.log(`${internals.types.b}: ${req.method}`, emoji.page, `${req.url} was requested`);
            res.end(); // Send a blank response, this can be changed to make it do whatever.
        } else {
            fs.access(__dirname + req.url, fs.constants.F_OK | fs.constants.W_OK, (err) => {
                if (err) {
                    modules.logger.log(`${internals.types.b}: ${req.method}`, emoji.page, `${req.url} was requested - Returned 404`);
                    res.status(404).send("404!<hr>Revolution");
                } else {
                    modules.logger.log(`${internals.types.b}: ${req.method}`, emoji.page, `${req.url} was requested`);
                    res.sendFile(__dirname + req.url);
                }
            });
        }
    }
}