let express = require('express');
let app = express();

let port = process.argv[2];
app.use(require('stylus').middleware('public'));
app.use(express.static('public'));

app.listen(port);