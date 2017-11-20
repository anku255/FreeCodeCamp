// 6. MAKE IT MODULAR
// Implement the last problem using modules

let filterFiles = require('./filterFiles.js');

let dirName = process.argv[2];
let ext = process.argv[3];

filterFiles(dirName, ext, function(err, fileNames){
    if (err)
        return console.log(err);

    fileNames.forEach(file => {
        console.log(file);
    });
});