var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  cookieId : String,
  cart : Object,
}, {
  versionKey: false // You should be aware of the outcome after set to false
});

var Sessions = mongoose.model('Sessions', userSchema, 'sessions');

module.exports = Sessions;