// 1. HELLO WORLD
// Create an Express.js app that outputs "Hello World!" when somebody goes to /home.
let express = require('express');
let app = express();

let port = process.argv[2];
app.get('/home', (req, res) => {
  res.end('Hello World!');
});

app.listen(port);