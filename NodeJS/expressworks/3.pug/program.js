// 2. PUG

let path = require('path');
let express = require('express');
let app = express();

let port = process.argv[2];

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.get('/home', (req, res) => {
  res.render('index', {date: new Date().toDateString()});
});

app.listen(port);
