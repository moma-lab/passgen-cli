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

|            Option |    Type    | Description                                |
| ----------------: | :--------: | :----------------------------------------- |
|     -V, --version |            | output the version number                  |
|      -l, --length | \<number\> | specify the password length (default: "8") |
|        -s, --save |            | save passwords to passwords.txt            |
| -nn, --no-numbers |            | exclude numbers from password              |
| -ns, --no-symbols |            | exclude symbols from password              |
|        -h, --help |            | display help for command                   |

Type in `$ passgen -h` on your command line to see a help with this options list.

## Node.js Development Steps
### Internal Node.js Modules Used

* fs - [https://nodejs.dev/learn/the-nodejs-fs-module](https://nodejs.dev/learn/the-nodejs-fs-module)<br />
  *a module that enables interacting with the local file system*
* path - [https://nodejs.dev/learn/the-nodejs-path-module](https://nodejs.dev/learn/the-nodejs-path-module)<br />
  *a module that provides a lot of very useful functionality to access and interact with the file system*
* os - [https://nodejs.dev/learn/the-nodejs-os-module](https://nodejs.dev/learn/the-nodejs-os-module)<br />
  *a module that provides many functions that you can use to retrieve information from the underlying operating system and the computer the program runs on, and interact with it*

### NPM Packages Used

* Commander - [https://github.com/tj/commander.js](https://github.com/tj/commander.js)<br />
  *a package to easily work with node.js command-line interfaces*
* Chalk - [https://github.com/chalk/chalk](https://github.com/chalk/chalk)<br />
  *a package to style command line outputs (strings)*
* Clipboardy - [https://github.com/sindresorhus/clipboardy](https://github.com/sindresorhus/clipboardy)<br />
  *a cross-platform package to access the system clipboard (copy/paste)*

## Dev Outline

* Create package.json file: `$ npm init` (given name: "passgen")
* Install npm dependencies: `$ npm i commander chalk clipboardy`
* Create the  following files/folders in your project root directory:
  * index.js (main file)
  * utils/createPassword.js
  * utils/savePassword.js
  * utils/shuffle.js

* ... code/implement everything needed ...

### Run Node.js scripts as shell commands

AFTER finishing coding edit `package.json`:
* Enter the following key-value pairs right under `"main": "index.js"`

  ```json
  "preferGlobal": true,   // Designate a package as preferring global installation
  "bin": "./index.js",    // Map a command name to a local file name (=install an executable into the PATH and create a symlink using "npm link")
  ```
  or
  ```json
  { "bin" : { "passgen" : "./index.js" } }
  ```

* open `index.js` and add a shebang `#!/usr/bin/env node` at first line. That is required to be interpretable by the shell when `$ passgen <options>` is called from CLI.

* type `$ npm link` on the command line
  * this creates a symlink so we can call "passgen" everywhere in our system<br /> (*hint:* `npm unlink` removes the created symlink)

> This approach works great *unless* you want to use ECMAScript modules in your scripts.

### Side Note: Execute ES Modules on the CLI

If you want to make ES modules executable on the command line you need to use some shell magic. Instead of using the well known [shebang](https://en.wikipedia.org/wiki/Shebang_(Unix)) `#!/usr/bin/env node` or `#!/usr/bin/node` add the following code at the beginning of your ES module:

```JS
":" //#;exec /usr/bin/env node --input-type=module - "$@" < "$0"

import process from 'process';
const { argv } = process
console.log(argv)
```

Save your file as `command.js` and you can run `zsh command.js` on the shell!

Thanks to Bramus for his [enlightening article on that topic](https://www.bram.us/2021/07/28/execute-es-modules-on-the-cli/).

If you want to dig deeper to find out how and why this is working, I suggest to have a look at [this article from 2014](http://sambal.org/2014/02/passing-options-node-shebang-line/).
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