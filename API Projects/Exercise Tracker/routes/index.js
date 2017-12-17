const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});
