let fs = require('fs');
let express = require('express');
let app = express();

let port = process.argv[2];

app.get('/books', (req, res) => {
  fs.readFile('./books.json', (err, data) => {
    if(err)
      return res.sendStatus(500);
    let jsonObj = JSON.parse(data);
    res.json(jsonObj);
  });
});

app.listen(port);
