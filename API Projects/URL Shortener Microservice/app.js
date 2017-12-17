const express = require('express');
const routes = require('./routes/index');
const mongoose = require('mongoose');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

// Connect to our Database and handle an bad connections
mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', err => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

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
