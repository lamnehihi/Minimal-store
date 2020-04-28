var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  cookieId : String,
  cart : Object
});

var Sessions = mongoose.model('Sessions', userSchema, 'sessions');

module.exports = Sessions;