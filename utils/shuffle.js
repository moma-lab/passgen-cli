/**
 * Checks if the passed variable is of type string ([object String]).
 *
 * @param {*} _var The variable to check if it's of type string or not.
 * @returns {boolean} Return 'true' if passed variable is of type string, 'false' if not.
 *
 * Source:
 * https://stackoverflow.com/a/17772086
 *
 * NOTE:
 * According to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class
 * one has to be careful because is UNRELIABLE! Objects can change the behavior of
 * Object.prototype.toString() by defining a "Symbol.toStringTag" property, leading
 * to unexpected results...
 *
 * Example pollution:
 *  Date.prototype[Symbol.toStringTag] = 'prototype polluted';
 *  Object.prototype.toString.call(new Date()); // [object prototype polluted]
 */
const isString = (_var) => {
  return Object.prototype.toString.call(_var) === '[object String]';
};

/**
 * Declare function isString() as object method on the prototype of EVERY
 * OBJECT (not only String objects).
 *
 * DON'T USE AN ARROW FUNCTION HERE !!! Won't work in object method context...
 * https://stackoverflow.com/questions/31755186/es6-arrow-functions-not-working-on-the-prototype
 * and https://morioh.com/p/761768c97ae4
 *
 * @returns {boolean}
 *
 * USAGE:
 *  const string = 'abcd'; string.isString(); // => true (string)
 *  "abcd".isString()                         // => true (string)
 *  const number = 1234; number.isString();   // => false (number)
 *  ['abcd'].isString()                       // => false (array)
 *
 *  String.prototype.isString = function () {}
 *  Object.prototype.isString = function () {}
 */
Object.prototype.isString = function () {
  return isString(this);
};

/**
 * Checks if the passed variable is of type Array ([object Array]).
 *
 * @param {*} _var Reference to a variable to be checked.
 * @returns {boolean} Returns 'true' if passed data is of type array, 'false' if not.
 *
 * NOTE:
 * According to https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/toString#using_tostring_to_detect_object_class
 * one has to be careful because is UNRELIABLE! Objects can change the behavior of
 * Object.prototype.toString() by defining a "Symbol.toStringTag" property, leading
 * to unexpected results...
 *
 * Example pollution:
 *  Date.prototype[Symbol.toStringTag] = 'prototype polluted';
 *  Object.prototype.toString.call(new Date()); // [object prototype polluted]
 */
const isArray = (_var) => {
  return (
    Array.isArray(_var) &&
    Object.prototype.toString.call(_var) === '[object Array]'
  );
};

/**
 * Convert a given string into a one dimensional array.
 *
 * @param {*} _str
 * @returns {}
 *
 * Sources:
 * - https://attacomsian.com/blog/javascript-convert-string-to-array
 * - Polyfill for Array.from():
 *   - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from#Polyfill
 */
const stringToArray = (_str) => {
  // Other methods to create an array from a string:
  //  - String.split(seperator);
  //  - Spread Operator (const arr = [..._str];)
  //  - *CAREFUL* Object.assign() (const chars = Object.assign([], _str);)
  //  - *BEST* Array.from() - can also deal with emojis in strings
  if (_str && isString(_str)) return Array.from(_str); // ES6 (modern browsers)

  // default: empty array
  return [];
};

/**
 * Converts a simple one dimensional array into a string (no recursion!).
 *
 * @param {*} _arr The array to convert.
 * @returns {string} The array content as string. Returns an empty string if something failed.
 *
 * Source: https://attacomsian.com/blog/javascript-convert-array-to-string
 */
const arrayToString = (_arr) => {
  // Check if parameter is valid to process
  // if (arr && Array.isArray(arr) && isArray(arr)) return arr.join('');
  if (
    _arr != null &&
    (_arr != 0 || _arr.indexOf(' ') !== -1) && // allow for [' '] (array element with 1 space). But NOT for empty elements like [] or [''] !!!
    _arr.length > 0 &&
    isArray(_arr)
  ) {
    return _arr.join('');
    // } else {
    //   console.log('Denial of processing...');
  }

  // default return value: empty string
  return '';
};

// __DEBUG__: to test behaviour of arrayToString() method
// console.log(`"${arrayToString([' '])}"`); //?

/**
 * Returns a string containing the type of a given variable VALUE (different
 * from variable type!). Also recognizes and returns self defined/implemented
 * data structures like 'DoublyLinkedList' or 'Node'...
 *
 * @param {*} object
 * @returns {string}
 *
 * Source: https://stackoverflow.com/a/4456344 (see comments to answer!)
 */
function typeOfVALUE(object) {
  return object === undefined ? 'Undefined' : object.__proto__.constructor.name;
}

/**
 * Returns the type identifier of a given VARIABLE. It's different from the internal
 * 'typeOf()' function. This one only returns that the type of a given var is an
 * 'object' (but not what KIND of object!)
 *
 * @param {*} _var The variable whose type shall be checked.
 * @returns {string} The type identifier of the given variable (e.g. "[object Boolean]").
 *
 * Example usage + expected results:
 *  typeOfVARIABLE([1,2,3])                -> "[object Array]"
 *  typeOfVARIABLE("foo bar")              -> "[object String]"
 *  typeOfVARIABLE(45)                     -> "[object Number]"
 *  typeOfVARIABLE(false)                  -> "[object Boolean]"
 *  typeOfVARIABLE(new String("foo bar"))  -> "[object String]"
 *  typeOfVARIABLE(null)                   -> "[object Null]"
 *  typeOfVARIABLE(/123/)                  -> "[object RegExp]"
 *  typeOfVARIABLE(undefined)              -> "[object Undefined]"
 *
 *  const func1 = () => {
 *    new Promise((resolve, reject) => {
 *      setTimeout(() => resolve({}), 1000)
 *    });
 *  };
 *  typeOfVARIABLE(func1)                  -> "[object Function]"
 *
 *  const func2 = async () => {};
 *  typeOfVARIABLE(func2)                  -> "[object AsyncFunction]"
 *
 * Source: https://stackoverflow.com/a/4456344
 */
function typeOfVARIABLE(_var) {
  return Object.prototype.toString.call(_var);
}

/**
 * Shuffles the data that is passed. Implementation of the "Fisher-Yates-Shuffle"
 * algorithm (https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
 *
 * @param {*} _data The data to shuffle.
 * @returns {string} A string containing the shuffled data. An empty string if string conversion failed.
 *
 * Sources:
 * - https://stackoverflow.com/a/962829 (theory)
 * - https://stackoverflow.com/a/4206715 (implementation from @Phrogz based on
 *   https://stackoverflow.com/a/962890)
 */
const shuffle = (_data) => {
  let array = [];

  // if a string was passed transform it into an array
  //   if (_data.isString()) array = stringToArray(_data);
  if (isString(_data)) array = stringToArray(_data);

  // __DEBUG__
  // const testVar = true;
  // console.log(`is string? ${testVar.isString()} (type: ${typeOfVARIABLE(testVar)})`);

  for (let tmp, cur, top = array.length; (top -= 1); ) {
    cur = (Math.random() * (top + 1)) << 0;
    tmp = array[cur];
    array[cur] = array[top];
    array[top] = tmp;
  }

  //   return array;
  // Return shuffled characters as STRING
  return arrayToString(array);
};

// Node.js function export
module.exports = shuffle;
