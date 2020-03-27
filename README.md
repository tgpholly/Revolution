<h1 align="center">
  <img align="center" height="150" src="http://ethanus.ml/images/Revolution.png">
</h1>

## What is Revolution?
Revolution is a modular web framework, written in node.js and built with the purpose of being a solid framework that apps can build upon to get up and running quickly and easily. Revolution is designed to make it easy to create the application you need, with no waste.

## What is Revolution for?
Basically anything. As long as you want to try it, it’s probably possible.
## How does Revolution work?
Revolution uses a set of modules to handle various functions, there are two modules included with the repo and builds, these being consoleHelper and example_request_handler. consoleHelper is a required module and as such the framework will not start without it, however example_request_handler can be removed without consequence and is there purely to help with module development.
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
### From build
```
Download latest build https://github.com/tgpethan/Revolution/releases/latest
Unzip the zip
Run the Revolution executable
```
## How to install modules.
With modules you simply have to place the module inside the modules folder and start the server.
The modules will automatically set themselves up and the server will start as normal.
## Projects Revolution is used in
[EUS](https://github.com/tgpethan/EUS/)