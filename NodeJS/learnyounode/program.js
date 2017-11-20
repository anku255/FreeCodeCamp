// 1.HELLO WORLD
//console.log('HELLO WORLD');

// 2. BABY STEPS
// Print the sum of numbers supplied in
// Command Line Arguments

// var numbers = process.argv.slice(2);
// numbers = numbers.map(x => Number(x));
// let sum = numbers.reduce(function (sum, value) {
//   return sum + value;
// }, 0);
// console.log(sum);

// 3. MY FIRST I/O!
// Print the number of '\n' in the given file

// let fs = require('fs');
// let filePath = process.argv[2];

// let bufferFile = fs.readFileSync(filePath);
// let stringFile = bufferFile.toString();
// let splittedFile = stringFile.split('\n');
// console.log(splittedFile.length - 1);

// 4. MY FIRST ASYNC I/O!
// Print the number of '\n' in the given
// file asynchronously

// let fs = require('fs');
// let filePath = process.argv[2];

// fs.readFile(filePath, 'utf8', function(err, data) {
//     if(err)
//         return console.log(err);
//     let lines = data.split('\n').length - 1;
//     console.log(lines);
// });

// 5. FILTERED LS
// Print a list of files in a given directory
// filtered by the extension of files

// let fs = require('fs');
// let path = require('path');

// let dirName = process.argv[2];
// let ext = '.' + process.argv[3];

// fs.readdir(dirName, function(err, fileNames) {
// if(err)
//     return console.log(err);
  
// for(const fileName of fileNames) {
//     if(ext === path.extname(fileName))
//         console.log(fileName);
// }
// });

// 6. MAKE IT MODULAR
// Implement the last problem using modules

// let filterFiles = require('./filterFiles.js');

// let dirName = process.argv[2];
// let ext = process.argv[3];

// filterFiles(dirName, ext, function(err, fileNames){
//     if (err)
//         return console.log(err);

//     fileNames.forEach(file => {
//         console.log(file);
//     });
// });

// 7. HTTP CLIENT
// Make an HTTP request and print all the data

// let http = require('http');

// let url = process.argv[2];

// http.get(url, (res) => {
//     res.setEncoding('utf8');
//     res.on('data', console.log);
//     res.on('error', console.error);
// }).on('error', console.error);


// 8. HTTP COLLECT
// similar to last problem except that we have to collect
// all the data from the stream
// Using a node module like 'bl' is recommended

let http = require('http');

let url = process.argv[2];

http.get(url, (res) => {
    result = '';
    res.setEncoding('utf8');
    res.on('data', (data) => {
        result += data;
    });

    res.on('end', () => {
        console.log(result.length);
        console.log(result);
    });
});
