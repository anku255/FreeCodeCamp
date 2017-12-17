const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');
const { catchErrors } = require('../handlers/errorHandler');

// Handle all the routes

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/api/exercise/new-user', catchErrors(apiController.createUser));
router.get('/api/exercise/users', catchErrors(apiController.getUsers));
router.post('/api/exercise/add', catchErrors(apiController.addExercise));

module.exports = router;
