const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const exerciseSchema = new mongoose.Schema({
  username: String,
  description: {
    type: String,
    maxlength: [20, 'description must be shorter than 20 characters!'],
    trim: true,
    required: 'You must provide a description!'
  },
  duration: {
    type: Number,
    min: [1, 'duration too short!'],
    required: 'You must supply a value for duration!'
  },
  userId: {
    type: String,
    ref: 'User'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);
