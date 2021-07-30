// Globals
const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numbers = '0123456789';
const symbols = '!@#$%^&*_-+=';

/**
 *
 * @param {string} length Length of the password to be generated.
 * @param {boolean} hasNumbers Boolean value to determine if the password shall contain numbers.
 * @param {boolean} hasSymbols Boolean value to determine if the password shall contain symbols.
 * @returns {string} Generated password string.
 */
// prettier-ignore
const createPassword = (length = '8', hasNumbers = true, hasSymbols = true) => {
    let usableCharacters = alpha;
    hasNumbers ? (usableCharacters += numbers) : '';
    hasSymbols ? (usableCharacters += symbols) : '';

    return generatedPassword(length, usableCharacters);
};

/**
 *
 * @param {string} passwordLength Length of the password to be generated.
 * @param {string} allowedChars String of allowed characters from which the password will be created.
 * @returns {string} Generated password string.
 */
const generatedPassword = (passwordLength, allowedChars) => {
  const shuffledChars = shuffle(allowedChars);
  let password = '';

  // On every iteration randomly choose 1 char from the allowed chars variable and feed it to
  // the password variable. Amount of loop equals the amount of password chars (=length).
  for (let i = 0; i < passwordLength; i += 1) {
    // Choose one character from chars string (lower/upper interval boundaries included)
    password += shuffledChars.charAt(
      Math.floor(Math.random() * (shuffledChars.length + 1))
    );
  }
  return password;
};

/**
 * https://stackoverflow.com/a/17772086
 * @param {*} data The data to check if it is of type string or not.
 * @returns {boolean} Return 'true' if passed data is of type string, 'false' if not.
 */

// According to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class
// one has to be careful because it's UNRELIABLE! Objects can change the behavior of
// Object.prototype.toString() by defining a "Symbol.toStringTag" property, leading
// to unexpected results...
//
// Example:
// Date.prototype[Symbol.toStringTag] = 'prototype polluted';
// Object.prototype.toString.call(new Date()); // [object prototype polluted]
//
const isString = (data) => {
  return Object.prototype.toString.call(data) === '[object String]';
};

// Add isString() function as method to prototype of every Object (not only
// String objects). DON'T USE ARROW FUNCTIONS: won't work...
// https://stackoverflow.com/questions/31755186/es6-arrow-functions-not-working-on-the-prototype
// and https://morioh.com/p/761768c97ae4
//
// Usage:
// const string = 'abcd'; string.isString() // true
// const string = 1234; string.isString() // false (number)
// "abcd".isString() // true
// ['abcd'].isString() // false (array)
// String.prototype.isString = function () {
Object.prototype.isString = function () {
  return isString(this);
};

/**
 *
 * @param {*} data The data to check if it is of type array or not.
 * @returns {boolean} Return 'true' if passed data is of type array, 'false' if not.
 */

// According to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class
// one has to be careful because is UNRELIABLE! Objects can change the behavior of
// Object.prototype.toString() by defining a "Symbol.toStringTag" property, leading
// to unexpected results...
//
// Example:
// Date.prototype[Symbol.toStringTag] = 'prototype polluted';
// Object.prototype.toString.call(new Date()); // [object prototype polluted]
//
const isArray = (data) => {
  return (
    Array.isArray(data) &&
    Object.prototype.toString.call(data) === '[object Array]'
  );
};

// https://attacomsian.com/blog/javascript-convert-string-to-array
// Convert a given string into a one dimensional array
// Polyfill for Array.from():
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
const stringToArray = (str) => {
  // Other methods to create an array from a string:
  // - String.split(seperator);
  // - Spread Operator (const arr = [...str];)
  // - *CAREFUL* Object.assign() (const chars = Object.assign([], str);)
  // - *BEST* Array.from() - can also deal with emojis in strings
  if (str && isString(str)) return Array.from(str); // ES6 (modern browsers)
  //   return '';
};

// https://attacomsian.com/blog/javascript-convert-array-to-string
const arrayToString = (arr) => {
  // if (arr && Array.isArray(arr) && isArray(arr)) return arr.join('');
  if (
    arr != null &&
    (arr != 0 || arr.indexOf(' ') !== -1) && // allows for [' '] (array element with 1 space). But NOT for empty elements like [] or [''] !!!
    arr.length > 0 &&
    Array.isArray(arr) &&
    isArray(arr)
  ) {
    return arr.join('');
    // } else {
    //   console.log('Else...');
  }
  return null;
};

// __DEBUG__: to test behaviour of arrayToString() method
// console.log(`"${arrayToString([' '])}"`); //?

// Returns a string containing the type of a given variable VALUE (different
// from variable type!). Also recognizes and returns self defined/implemented
// data structures like 'DoublyLinkedList' or 'Node'...
// https://stackoverflow.com/a/4456344 (see the comments to the answer!)
function typeOfVALUE(object) {
  return object === undefined ? 'Undefined' : object.__proto__.constructor.name;
}

// // Return the type of the given VARIABLE (different from internal 'typeOf()' function,
// which, for example, only returns that the type of a given var is 'object' (but not
// what KIND of object!)
//
// Examples:
// typeOfVARIABLE([1,2,3])                -> "[object Array]"
// typeOfVARIABLE("foo bar")              -> "[object String]"
// typeOfVARIABLE(45)                     -> "[object Number]"
// typeOfVARIABLE(false)                  -> "[object Boolean]"
// typeOfVARIABLE(new String("foo bar"))  -> "[object String]"
// typeOfVARIABLE(null)                   -> "[object Null]"
// typeOfVARIABLE(/123/)                  -> "[object RegExp]"
// typeOfVARIABLE(undefined)              -> "[object Undefined]"
// const func1 = () => new Promise((resolve, reject) => setTimeout(() => resolve({}), 1000));
// typeOfVARIABLE(func1)                  -> "[object Function]"
// const func2 = async () => ({})
// typeOfVARIABLE(func2)                  -> "[object AsyncFunction]"
//
// https://stackoverflow.com/a/4456344
function typeOfVARIABLE(variable) {
  return Object.prototype.toString.call(variable);
}

// Implementation of the "Fisher-Yates-Shuffle" algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
// https://stackoverflow.com/a/962829 (theory)
// https://stackoverflow.com/a/4206715 (implementation from @Phrogz based on https://stackoverflow.com/a/962890)
const shuffle = (data) => {
  let array = [];

  // if a string was passed transform it into an array
  //   if (data.isString()) array = stringToArray(data);
  if (isString(data)) array = stringToArray(data);

  //   const strg = true;
  //   console.log(`is string? ${strg.isString()} (type: ${typeOfVARIABLE(strg)})`);

  for (let tmp, cur, top = array.length; (top -= 1); ) {
    cur = (Math.random() * (top + 1)) << 0;
    tmp = array[cur];
    array[cur] = array[top];
    array[top] = tmp;
  }

  //   return array;
  // Return generated password as STRING
  return arrayToString(array);
};

// Node.js export
module.exports = createPassword;
