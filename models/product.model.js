var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  name : String,
  price : Number,
  detail : String,
  description : String,
  image : String,
  color : String,
  categories : String
});

var Product = mongoose.model('Product', userSchema, 'products');

module.exports = Product;