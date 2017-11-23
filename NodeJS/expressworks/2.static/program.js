// 2. STATIC

let express = require('express');
let app = express();

let port = process.argv[2];

app.use(express.static('public'));
app.listen(port);
