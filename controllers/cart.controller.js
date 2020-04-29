var express = require("express");
var app = express();

var Sessions = require("../models/sessions.model");
var Products = require("../models/products.model");

module.exports.index = async function (req, res) {
  res.render("cart/index", {
    cart: res.locals.cart,
    countProducts: res.locals.countProducts,
    cartLength: res.locals.cartLength,
    x: 0,
  });
};

module.exports.addToCart = async function (req, res, next) {
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
  cart.length = 0;
  for (var product in cart) {
    cart.length += cart[product];
  }
  session.cart = cart;

  //update cart to DB
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

module.exports.removeFromCart = async function (req, res, next) {
  var productId = req.params.productId;
  var session = res.locals.session;
  var cart = session.cart;

  delete cart[productId];
  
  //count total products in cart
  cart.length = 0;
  for (var product in cart) {
    cart.length += cart[product];
  }
  session.cart = cart;

  //update cart to DB
  var isDone = await Sessions.update(
    { cookieId: req.signedCookies.cookieId },
    session,
    {
      upsert: true,
    },
    function (err, rawResponse) {}
  );

  res.redirect("/cart");
};

module.exports.updateToCart = async function (req, res, next) {
  var productId = req.params.productId;
  var session = res.locals.session;
  var cart = session.cart;

  cart[productId] = parseInt(req.body.countProduct);
  //count total products in cart
  cart.length = 0;
  for (var product in cart) {
    cart.length += cart[product];
  }
  session.cart = cart;

  //update cart to DB
  var isDone = await Sessions.update(
    { cookieId: req.signedCookies.cookieId },
    session,
    {
      upsert: true,
    },
    function (err, rawResponse) {}
  );

  res.redirect("/cart");
};
