const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { catchErrors } = require('../handlers/errorHandler');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});

router.get('/new/*', catchErrors(urlController.getShortenUrl));

router.get('/:hashCode', catchErrors(urlController.getFullUrl));

module.exports = router;
