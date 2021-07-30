const fs = require('fs'); // included module to deal with local file system
const path = require('path'); // included module to handle paths
const os = require('os'); // included module to deal with some operating system properties
const chalk = require('chalk'); // installed module to design the command line output

const savePassword = (data) => {
  // open file: 'a'=append to file, '666'=file permissions, callback function (anonymous arrow function)
  fs.open(
    path.join(__dirname, '../', 'passwords.txt'),
    'a',
    777,
    (event, id) => {
      // write to file
      fs.write(id, data + os.EOL, null, 'utf-8', () => {
        // close after finishing
        fs.close(id, () => {
          console.log(chalk.green('Password saved to passwords.txt'));
        });
      });
    }
  );
};

// Node.js export of function to include & reuse it in other js files
module.exports = savePassword;
