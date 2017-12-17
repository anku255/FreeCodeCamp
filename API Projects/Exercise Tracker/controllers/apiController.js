const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const User = require('../models/User');

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
