let express = require('express');
let app = express();
let bodyParser = require('body-parser');

let port = process.argv[2];

app.use(bodyParser.urlencoded({extended: false}));
app.post('/form', (req, res) => {
  let str = req.body.str.split('').reverse().join('');
  res.send(str);
});

app.listen(port);