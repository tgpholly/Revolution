<h1 align="center">
  <img align="center" height="150" src="http://eusv.ml/images/RevolutionLossless.webp">
</h1>

[![Release](https://img.shields.io/github/v/release/tgpethan/revolution.svg)](https://github.com/tgpethan/Revolution/releases/latest)
[![CodeFactor](https://www.codefactor.io/repository/github/tgpethan/revolution/badge)](https://www.codefactor.io/repository/github/tgpethan/revolution)
[![Discord](https://img.shields.io/discord/477024246959308810?color=7289da&label=Discord&logo=discord&logoColor=ffffff)](https://discord.gg/BV8QGn6)
## What is Revolution?
Revolution is a modular web server, written in node.js and was built with my web projects in mind, but others might find a use in it.

## What is Revolution for?
Basically anything web related. As long as you want to try it, it’s probably possible.
## How does Revolution work?
Revolution uses a set of modules to handle various functions, there are two modules included with the repo and builds, these being consoleHelper and example_request_handler. consoleHelper is a required module and as such the server will not start without it although nothing is stopping you from making your own module with the module identifier of **handle_console**, however example_request_handler can be removed without consequence and is there purely to help with module development.
## How do modules work?
Modules are loaded in at runtime and are completely separate from each other. Each module has a prefix, for example the request handlers have the prefix “handle_requests” and the consoleHelper has the prefix of "handle_console". These prefixes help the server to determine the function of each module.
## How to use Revolution.
### From source
```
git clone https://github.com/tgpethan/Revolution.git
cd Revolution
npm i
node .
```
## How to install modules.
With modules you simply have to place the module inside the modules folder and start the server.
The modules will automatically set themselves up and the server will start as normal.
## Projects Revolution is used in
[EUS](https://github.com/tgpethan/EUS/)

[EUS-wiki](https://github.com/tgpethan/EUS-wiki)
