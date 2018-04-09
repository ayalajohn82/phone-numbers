const fs = require('fs');
const filePath = './numbers.log';

// If file exists when init it removes file
exports.init = function() {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}