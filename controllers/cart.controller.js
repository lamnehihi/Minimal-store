var express = require("express");
var app = express();

var Sessions = require("../models/sessions.model");
var Products = require("../models/products.model");

module.exports.index = async function (req, res) {
  var cart = res.locals.session.cart;
  var countProducts = Object.values(cart);

  var productsId = Object.keys(cart);
  productsId.shift();

  //remove length in countProducts
  var cartLength = countProducts.shift();

  var records = await Products.find().where('_id').in(productsId).exec();

  res.render("cart/index", {
    cart : records,
    countProducts : countProducts,
    cartLength : cartLength,
    x : 0
  });
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
  cart.length = 0;
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
