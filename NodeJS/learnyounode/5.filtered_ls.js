// 5. FILTERED LS
// Print a list of files in a given directory
// filtered by the extension of files

let fs = require('fs');
let path = require('path');

let dirName = process.argv[2];
let ext = '.' + process.argv[3];

fs.readdir(dirName, function(err, fileNames) {
  if(err)
    return console.log(err);

  for(const fileName of fileNames) {
    if(ext === path.extname(fileName))
      console.log(fileName);
  }
});