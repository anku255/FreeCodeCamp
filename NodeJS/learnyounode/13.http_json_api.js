// 13. HTTP JSON API SERVER
// Write an HTTP server that serves JSON data when it receives a GET request
// to the path '/api/parsetime'. Expect the request to contain a query string
// with a key 'iso' and an ISO-format time as the value.

let url = require('url');
let http = require('http');

let port = process.argv[2];

let server = http.createServer((req, res) => {
  const urlObject = url.parse(req.url, true);
  const isoTime = urlObject.query['iso'];
  const date = new Date(isoTime);
  
  res.setHeader('Content-Type', 'application/json');
  res.end(getJSONResponse(urlObject.pathname, date));

});

server.listen(port);

function getJSONResponse(endpoint, date) {
  let jsonRes;
  if(endpoint === '/api/parsetime') {
    jsonRes = {
      'hour': date.getHours(),
      'minute': date.getMinutes(),
      'second': date.getSeconds()
    };
  } else {
    jsonRes = {
      'unixtime': date.getTime()
    };
  }
  return JSON.stringify(jsonRes);
}