const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../models/User');
const Exercise = require('../models/Exercise');

exports.createUser = async (req, res) => {
  // check if the username is taken already
  const oldUser = await User.findOne({ username: req.body.username });
  if (oldUser) {
    return res.send('<p>Username already taken!</p');
  }

  // Create a new User
  const user = await new User(req.body).save();
  res.json(user);
};

exports.getUsers = async (req, res) => {
  const users = await User.find({});
  res.json(users);
};

exports.addExercise = async (req, res) => {
  // find the user for supplied ID
  const user = await User.findOne({ _id: req.body.userId });

  if (!user) {
    return res.send('<p>Invalid User ID</p>');
  }

  // Add username and date to req.body
  req.body.username = user.username;
  req.body.date = req.body.date ? new Date(req.body.date) : Date.now();

  // Create a new Exercise
  let exercise = await new Exercise(req.body).save();

  // Changes for required response
  exercise = exercise.toObject();
  exercise.username = user.username;
  exercise.date = new Date(exercise.date).toDateString();
  exercise._id = exercise.userId;
  delete exercise.__v;
  delete exercise.userId;

  res.json(exercise);
};

exports.getExercises = async (req, res) => {
  // find user
  const user = await User.findOne({ _id: req.query.userId });
  if (!user) {
    return res.send('<p>Invalid User ID</p>');
  }

  // handle to and from date
  let from = new Date(req.query.from);
  from = from == 'Invalid Date' ? 0 : from.getTime();
  let to = new Date(req.query.to);
  to = to == 'Invalid Date' ? Date.now() : to.getTime();

  // check limit
  const limit = parseInt(req.query.limit) || 20;

  // find exercises in given range
  const exercises = await Exercise.find({
    userId: user._id,
    date: {
      $gt: from,
      $lt: to
    }
  })
    .sort({ date: -1 })
    .limit(limit);

  // construct the proper output
  const response = {
    _id: user._id,
    username: user.username,
    count: exercises.length,
    log: exercises.map(exercise => ({
      description: exercise.description,
      duration: exercise.duration,
      date: new Date(exercise.date).toDateString()
    }))
  };

  // send it
  res.json(response);
};
