var express = require("express");
var app = express();

var Sessions = require("../models/sessions.model");

module.exports.index = function (req, res) {
  console.log(req.cookies);
  res.render("cart/index");
};

module.exports.addToCart = async function (req, res, next) {
  console.log(req.params);

  var productId = req.params.productId;
  var session = res.locals.session;
  var cart = session.cart;

  //add product to cart
  if (productId in cart) {
    cart[productId] += 1;
  } else {
    cart[productId] = 1;
  }

  //count total products in cart
  for (var product in cart) {
    cart.length += cart[product];
  }
  session.cart = cart;

  var isDone = await Sessions.update(
    { cookieId: req.signedCookies.cookieId },
    session,
    {
      upsert: true,
    },
    function (err, rawResponse) {}
  );

  res.redirect("/products");
};
