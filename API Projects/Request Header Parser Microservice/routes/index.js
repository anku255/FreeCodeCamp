const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/api/whoami', apiController.getHeaders);

module.exports = router;
