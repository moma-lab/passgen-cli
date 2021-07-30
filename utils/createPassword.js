// Imported modules
const shuffle = require('./shuffle'); // string shuffeling and array functions

// Define globals
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
 * Generates a random password.
 *
 * @param {string} passwordLength Length of the password to be generated.
 * @param {string} allowedChars String of allowed characters from which the password will be created.
 * @returns {string} The generated password string.
 */
const generatedPassword = (passwordLength, allowedChars) => {
  // Randomly shuffle the allowed characters (leads to more secure passwords)
  const shuffledChars = shuffle(allowedChars);
  let password = '';

  // On every iteration randomly choose one character from the allowedChars variable and feed
  // it to the password variable. Amount of loop equals the amount of password chars (=length).
  for (let i = 0; i < passwordLength; i += 1) {
    // Choose one character from chars string (lower/upper interval boundaries included)
    password += shuffledChars.charAt(
      Math.floor(Math.random() * (shuffledChars.length + 1))
    );
  }

  // return password string
  return password;
};

// Node.js export
module.exports = createPassword;
