// 12. HTTP UPPERCASER
// Write an HTTP server that receives only POST requests and converts
// incoming POST body characters to upper -case and returns it to the client.

let http = require('http');
let map = require('through2-map');

let port = process.argv[2];

let server = http.createServer((req, res) => {
  if(req.method === 'POST')
    // console.log(toUppercase(res));
    req.pipe(map((chunk) => chunk.toString().toUpperCase())).pipe(res);
});

server.listen(port);