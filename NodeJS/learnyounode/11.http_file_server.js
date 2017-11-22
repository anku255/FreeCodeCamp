// 11. HTTP FILE SERVER
// Create an http server that serves the same text file for each
// request it receives.
// Port number and location of file is provided as CLA.

let http = require('http');
let fs = require('fs');

let port = process.argv[2];
let fileDir = process.argv[3];

let server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  fs.createReadStream(fileDir).pipe(res);
});

server.listen(port);