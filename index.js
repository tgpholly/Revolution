const express = require("express"),
	  fs = require("fs"),
	  chalk = require("chalk"),
	  emoji = require("./misc/emoji_list.json");
// This is a class that contains the name and status of required modules
class reqMod {
	constructor(name, status) {
		this.name = name;
		this.status = status;
	}
}
// List containing a list of required modules and their flags
const requiredModules = [
	new reqMod("handle_console", false)
];
let config;
// Statup so sync stuff is fine
// Check if config exists
if (fs.existsSync("./config/config.json")) {
	// It exists, load it.
	config = JSON.parse(fs.readFileSync("./config/config.json"));
} else {
	console.log("[Config] Config file doesn't exist! You probably haven't copied the example config in the config directory.");
	console.log("[Config] Exiting...");
	// It doesn't exist, exit Revolution and tell the user what to do
	process.exit(1);
}
global.actualDir = __dirname;
global.internals = {
	version:"Open Source",
};
global.app = express();
global.modules = [];
// Get the time at invocation
let startTime = Date.now(),
reqhandler;

let shutdownOnInitEnd = false;

// Clear console before printing anything
console.clear();

// Read the server header for output
fs.readFile('./misc/ascii.txt', function(err, data) {
	// Make sure there are no errors
	if (err) throw err;
	// Generate and Print the banner
	console.log(highlightHeader(data));
	// Get the modules from the ./modules folder
	fs.readdir("./modules", (err, files) => {
		// Throw if we failed to read folder
		if (err) throw err;
		for (var i = 0; i < files.length; i++) {
			/*
				For every file in the list, output that it was found 
				in the console and attempt to load it using require.
				Oh, and check that it has .js in it's file name!
			*/
			try {
				// Make sure the file has the extention of .js
				if (files[i].includes(".js")) {
					console.log(`[Modules] Found module ${files[i].toString()}`);
					const thisModule = global.modules[files[i].toString().replace(".js", "")] = require(`./modules/${files[i].toString()}`);

					let nodeModulesCheck = [];
					thisModule.REQUIRED_NODE_MODULES.forEach(module => {
						try {
							require(module);
						} catch (e) {
							// we'll only get down here if the module is not installed or has an error
							if ((!config.other.auto_install_modules && e.code != "MODULE_NOT_FOUND")) 
								console.error(chalk.bgRed(chalk.black(` ! [Modules] ${files[i].replace(".js", "")} requires node module "${module}" but it ${e.code != "MODULE_NOT_FOUND" ? "failed to load" : "is not installed"} `)));
							
							if (e.code != "MODULE_NOT_FOUND") {
								console.error(e);
							}
							// Push module name so we can install it if
							// it is enabled in the config
							nodeModulesCheck.push(module);
						}
					});

					if (nodeModulesCheck.length != 0) {
						// Check if we can auto install node modules
						if (config.other.auto_install_modules) {
							// We've been told to install modules for the user lmao
							const { execSync } = require("child_process");
							console.log(`[Modules] Installing all ${files[i].replace(".js", "")} node modules...`);
							let installed = 0;
							nodeModulesCheck.forEach(module => {
								console.log(`[Modules] [${(installed++) + 1}/${nodeModulesCheck.length}] Installing ${module}...`);
								execSync(`npm i --save ${module.split("\"").join("").split("'").join("").split(";").join("").split("&").join("")}`)
							});
							console.log(`[Modules] Installed all ${files[i].replace(".js", "")} node modules`);
							// Clear it out
							nodeModulesCheck = [];
						} else {
							// We can't auto install node modules so just make sure Revolution shuts down at the end of module loading.
							// We want the user to have a full picture of what they need to install
							shutdownOnInitEnd = true;
						}
					}

					// If this is 0 we can safely init the module
					if (nodeModulesCheck.length == 0 && thisModule.init != null) {
						console.log(`[Modules] Running init for ${files[i]}`);
						try {
							thisModule.init();
						} catch (e) {
							console.log(chalk.bgRed(chalk.black(` ! [Modules] There was an issue running init for ${files[i]}`)));
							console.log(chalk.bgRed(chalk.black(` ! [Modules] ${err}`)));
						}
					}
					
					// We want to find out what the request handler module is
					if (thisModule.MOD_FUNC == "handle_requests") {
						// Set reqhandler to the request handler for easy getting
						reqhandler = thisModule;
					}

					// Loop through the required modules
					for (var i1 = 0; i1 < requiredModules.length; i1++) {
						// Check if this module is a required module
						if (thisModule.MOD_FUNC == requiredModules[i1].name) {
							// It is a required module, set the status of this one to true
							requiredModules[i1].status = true;
							break;
						}
					}
				} else {
					// File is not a .js file (module)
					// Make sure the file is not a directory
					if (files[i].split(".").length < 2) continue;
					// Inform user that a file that was found in the modules folder is not a module
					console.log(`[Modules] Found file ${files[i]}. It is not a module.`)
				}
			} catch (err) {
				console.log(chalk.bgRed(chalk.black(` ! [Modules] There was an issue loading ${files[i]}`)));
				console.log(chalk.bgRed(chalk.black(` ! [Modules] ${err}`)));
			}
		}
		// Check if all the required modules flags are set
		let allRequiredExist = [];
		for (var i = 0; i < requiredModules.length; i++) {
			// Push the status of the required modules to an list
			allRequiredExist.push(requiredModules[i].status);
		}
		// Make sure all required modules are found
		if (allRequiredExist.length !== requiredModules.length) {
			// Inform the user that not all required modules are found.
			console.log(chalk.bgRed(chalk.black(" ! [Modules] All required modules could not be found. ")));
			console.log(chalk.bgRed(chalk.black(" ! [Modules] Server will not start until all required modules are found. ")));
			// They are not all found, exit Revolution with code 1.
			process.exit(1);
		} else if (shutdownOnInitEnd) {
			console.log("\n" + chalk.bgRed(chalk.black(" ! [Modules] Required node modules for one or more modules could not be found. ")));
			console.log(chalk.bgRed(chalk.black(" ! [Modules] Either install all required modules or enable auto install in the config. ")));
			process.exit(1);
		} else {
			// All required modules are found, start Revolution's server.
			global.modules.consoleHelper.printInfo(emoji.wave, "Starting Revolution...");
			if (reqhandler == null) {
				global.modules.consoleHelper.printError(emoji.cross, "No request handler was loaded, possibly due to an error.");
				process.exit(1);
			}
			start();
		}
	});
});

async function start() {
	// Load in the request handler's extra required items.
	await reqhandler.extras();
	// Define where GET requests go to in the request handlers.
	app.get('*', async (req, res) => {
		res.set("X-Powered-By", "Revolution");
		reqhandler.get(req, res);
	});
	// Define where POST requests go to in the request handlers.
	app.post('*', async (req, res) => {
		res.set("X-Powered-By", "Revolution");
		reqhandler.post(req, res);
	});
	// Start the server listening at the port defined in the config file
	app.listen(config.server.port, () => {
		// Get time after server has started listening or the "end time".
		global.modules.consoleHelper.printInfo(emoji.thumb_up, `Started Revolution on port ${config.server.port}! Took ${Date.now() - startTime}ms`);
	});
}

function highlightHeader(s) {
	// Add the appropriate colours to the header and add information to it
	const s1 = s.toString().replace("|replaceVersion|", `${chalk.yellow("Version:")} ${chalk.cyan(internals.version)}`)
	.replace("|titlecard|", chalk.yellow("A modular and fexible server"))
	.replace("|replaceType|", `${chalk.yellow("Instance: ")}${chalk.cyan(config.server.instance_type)}`);
	return s1;
}