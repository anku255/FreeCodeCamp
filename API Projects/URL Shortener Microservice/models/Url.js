const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const urlSchema = new mongoose.Schema({
  url: {
    type: String,
    trim: true,
    required: 'You must supply a url'
  },
  code: {
    type: Number,
    required: 'You must supply a hashCode!'
  }
});

module.exports = mongoose.model('Url', urlSchema);
