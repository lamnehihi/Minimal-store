var express = require('express');
var app = express();

var Sessions = require('../models/sessions.model');

module.exports.index = function(req, res) {
  console.log(req.cookies);
  res.render('cart/index');
}

module.exports.addToCart = function(req, res, next) {
  console.log(req.params);
  console.log(res.locals.session);

}