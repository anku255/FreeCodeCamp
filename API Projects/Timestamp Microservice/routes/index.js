const express = require('express');
const router = express.Router();
const dateController = require('../controllers/dateController');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});

// Timestamp route
router.get('/:date', dateController.getTimeStamp);

module.exports = router;
