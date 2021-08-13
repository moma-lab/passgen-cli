#!/usr/bin/env node

// use "$ npm index" to print out all arguments passed during call of script/app
// console.log(process.argv);

// How to manually check passed arguments?
// if (process.argv[2] === 'generate')
//   console.log('Request to generate a new password.');

// Utilizing the 'spread operator' on the process.argv array
// const [absolutePathToNode, absolutePathToScript, ...rest] = process.argv;
// console.log(rest);

// Import installed npm packages and required custom libraries
const program = require('commander'); // npm package commander to easily deal with command line arguments
// Another outstanding cmd package is "enquirer" (https://www.npmjs.com/package/enquirer)
const chalk = require('chalk'); // npm package chalk to design command line output nicely
const clipboardy = require('clipboardy'); // npm package to copy data to the local clipboard
const createPassword = require('./utils/createPassword'); // custom password creation library
const savePassword = require('./utils/savePassword'); // custom methods to save generated passwords to a file

// Configure command line options (package 'commander')
program.version('1.0.0').description('Simple custom password generator CLI');

// Add OPTIONS (visible in `$ node index -h`)
// Syntax: program.option('flag/identifier', 'description', 'default value')
program
  .option('-l, --length <number>', 'specify the password length', '8') // number
  .option('-s, --save', 'save passwords to passwords.txt') // boolean
  .option('-nn, --no-numbers', 'exclude numbers from password') // boolean
  .option('-ns, --no-symbols', 'exclude symbols from password') // boolean
  .parse();

// Add a command handler ('commander' module)
// prettier-ignore
// program.command('generate').action(() => {
//     console.log('Generated');
// }).parse();

// __DEBUG__ Display object with all passed options (`$ node index`)
// console.log(program.opts());

// Destructure relevant options from command line object
const { length, save, numbers, symbols } = program.opts();

// Get generated password
const generatedPassword = createPassword(length, numbers, symbols);

// Save password to file
if (save) {
  savePassword(generatedPassword);
}

// Copy generated password to clipboard
clipboardy.writeSync(generatedPassword);

// Output generated password
console.log(chalk.blue('Generated password: ') + chalk.bold(generatedPassword));
console.log(chalk.yellow('Password copied to clipboard.'));
