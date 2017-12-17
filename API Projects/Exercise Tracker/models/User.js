const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const shortid = require('shortid');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: 'You must supply a username!',
      unique: 'username is already taken!',
      maxlength: [20, 'username must be shorter than 20 characters!']
    },
    _id: {
      type: String,
      default: shortid.generate
    }
  },
  {
    versionKey: false // disable version key for this project
  }
);

module.exports = mongoose.model('User', userSchema);
