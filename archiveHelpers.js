const fs = require('fs');
const filePath = './numbers.log';

/**
 * If file exists when init it removes file
 */
exports.init = function() {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

/**
 * adds a number to the numbers.log archive
 * @param {string} number - phone number being added to archive
 * @returns {boolean} - whether number was added
 */
exports.addNumberToList = function(number) {
  var writable = number + '\n';
  fs.appendFile('./numbers.log', writable, function(error) {
    if (error) {
      console.log('Phone Number Insert Failed', error);
      return false;
    }
    console.log('added number successfully');
    return true;
  });
}

/**
 *  Read phone numbers in archive
 *  Used for dev env
 */
exports.readListOfNumbers = function() {
  fs.readFile(filePath, function(err, data) {
    if(err) {
      console.log(err);
    } else {
      let phoneNumbers = data.toString().split('\n');
      console.log('numbers', phoneNumbers);
    }
  });
};