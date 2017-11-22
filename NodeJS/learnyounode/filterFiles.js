// Module for problem 6

let fs = require('fs');
let path = require('path');

function filterFiles(dir, fileExt, callback) {
  fileExt = '.' + fileExt;
  fs.readdir(dir, function (err, fileNames) {
    if (err)
      return callback(err);
    let filteredList = fileNames.filter((file) => fileExt === path.extname(file));
    callback(null, filteredList);
  });
}

module.exports = filterFiles;