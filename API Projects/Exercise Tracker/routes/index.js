const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { catchErrors } = require('../handlers/errorHandler');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/api/exercise/new-user', catchErrors(apiController.createUser));

module.exports = router;
