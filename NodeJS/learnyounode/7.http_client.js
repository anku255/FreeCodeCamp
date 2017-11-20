// 7. HTTP CLIENT
// Make an HTTP request and print all the data

let http = require('http');

let url = process.argv[2];

http.get(url, (res) => {
    res.setEncoding('utf8');
    res.on('data', console.log);
    res.on('error', console.error);
}).on('error', console.error);