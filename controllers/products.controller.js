var Products = require("../models/products.model");

module.exports.index = async function (req, res) {
  //check cookie
  var cookieIdd = res.locals.cookieId;
  if (!cookieIdd) {
    res.redirect("/products");
    return;
  }

  var session = res.locals.session;

  var products = await Products.find();

  res.render("products/index", {
    products: products,
  });
};
