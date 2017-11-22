// 4. MY FIRST ASYNC I/O!
// Print the number of '\n' in the given
// file asynchronously

let fs = require('fs');
let filePath = process.argv[2];

fs.readFile(filePath, 'utf8', function(err, data) {
  if(err)
    return console.log(err);
  let lines = data.split('\n').length - 1;
  console.log(lines);
});