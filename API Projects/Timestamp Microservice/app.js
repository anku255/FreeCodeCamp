const express = require('express');
const routes = require('./routes/index');

// create our express app
const app = express();

// view engine setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// handle routes
app.use('/', routes);

// setup port
app.set('port', process.env.PORT || 3000);

// start the server
const server = app.listen(app.get('port'), () => {
  console.log(`Express running → PORT ${server.address().port}`);
});
