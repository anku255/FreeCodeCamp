let express = require('express');
let app = express();

let port = process.argv[2];

app.put('/message/:id', (req, res) => {
  let id = req.params.id;
  let result = require('crypto')
    .createHash('sha1')
    .update(new Date().toDateString() + id)
    .digest('hex');

  res.send(result);
});

app.listen(port);