## Node.js Password Generator CLI

A command line used generator for random passwords written in JavaScript (Node.js). The generated passwords are automatically copied to the clipboard to be able to instantly paste them into an input field where it's needed (like a registration form, a login, etc.).

## Supported Features

* determine custom password length (default length: 8 characters)
* passwords are made up from **numeric** and **alphanumeric** characters (lowercase and uppercase) as well as **symbols** (utf-8 conform)
* determine if numeric characters shall be used for the password (default: true)
* determine if symbols shall be used for the password (default: true)
* save password to a password file (default: false)
* generated password is copied to clipboard for instant paste availability

## Installation

1. Clone this repo: `$ git clone https://github.com/moma-lab/passgen-cli`
2. `$ npm install`

## Usage

`$ passgen <options>`

Options:

|                Option | Description                                |
| --------------------: | :----------------------------------------- |
|         -V, --version | output the version number                  |
| -l, --length <number> | specify the password length (default: "8") |
|            -s, --save | save passwords to passwords.txt            |
|     -nn, --no-numbers | exclude numbers from password              |
|     -ns, --no-symbols | exclude symbols from password              |
|            -h, --help | display help for command                   |


Type in `$ passgen -h` on your command line to see a help with this options list.

## NPM Packages and Node.js modules used

### Internal Node.js modules

* fs - a module that enables interacting with the local file system (https://nodejs.dev/learn/the-nodejs-fs-module)
* path - module that provides a lot of very useful functionality to access and interact with the file system (https://nodejs.dev/learn/the-nodejs-path-module)
* os - module that provides many functions that you can use to retrieve information from the underlying operating system and the computer the program runs on, and interact with it (https://nodejs.dev/learn/the-nodejs-os-module)

### Installed NPM packages

* Commander - [https://github.com/tj/commander.js](https://github.com/tj/commander.js)
* Chalk - [https://github.com/chalk/chalk](https://github.com/chalk/chalk)
* Clipboardy - [https://github.com/sindresorhus/clipboardy](https://github.com/sindresorhus/clipboardy)

## Development steps

* Create package.json file: `$ npm init` (given name: "passgen")
* Install npm dependencies: `$ npm i commander chalk clipboardy`
* Create the  following files/folders in your project root directory:
  * index.js (main file)
  * utils/createPassword.js
  * utils/savePassword.js
* code your way :)
* after finishing coding: edit `package.json`:
  * Enter the following key-value pairs right under `"main": "index.js"`

    ```json
    "preferGlobal": true,   // Designate a package as preferring global installation
    "bin": "./index.js",    // To map a command name to a local file name (=install an executable into the PATH and create a symlink using "npm link")
    ```
    or
    ```json
    { "bin" : { "myapp" : "./cli.js" } }
    ```

* type `$ npm link` on the commandline
  * creates a symlink so we can call "passgen" everywhere in our system
  * (*hint:* `npm unlink` removes the created symlink)

* open `index.js` and add a shebang `#!/usr/bin/env node` at first line.
  * that's required to be interpretable by the shell when `$ passgen <options>` command is called from command line using 

## Acknowlegements

* Traversy Media Video: [Build a Node.js Password Generator](https://www.youtube.com/watch?v=3Xx83JAktXk)
* Traversy Media Code: [Code at GitHub](https://github.com/bradtraversy/passgen)

## Contributions Welcome

Created with ♥ by moma.dev.lab<br />

Feel free to submit a pull request. Help is always appreciated!

* Please make sure to follow my [Contribution Guideline](CONTRIBUTING.md). 
* This [Code of Conduct](CODE_OF_CONDUCT.md) applies to all contributions (pull requests, issues, comments, etc).

Thank you!

## License

Published under the [MIT Licence](LICENSE.md).