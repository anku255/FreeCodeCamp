// 3. MY FIRST I/O!
// Print the number of '\n' in the given file

let fs = require('fs');
let filePath = process.argv[2];

let bufferFile = fs.readFileSync(filePath);
let stringFile = bufferFile.toString();
let splittedFile = stringFile.split('\n');
console.log(splittedFile.length - 1);