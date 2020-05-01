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

module.exports.search = async function (req, res) {
  var products = await Products.find();

  var q = req.query.q;
  var matchProducts = products.filter(function(product) {
    return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
  });

  res.render("products/index", {
    products: matchProducts,
    q
  });

};
