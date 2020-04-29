var Sessions = require("../models/sessions.model");
var Products = require("../models/products.model"); 

module.exports.requireSession = async function (req, res, next) {
  var cookieIdd = req.signedCookies.cookieId;

  //check session
  var session = await Sessions.findOne({ cookieId: cookieIdd });
  if (!session) {
    session = {
      cookieId: cookieIdd,
      cart: {
        length: 0,
      },
    };
    Sessions.create(session, function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
    res.redirect("/products");
    return;
  }
  
  var cart = session.cart;
  //count total products in cart
  cart.length = 0;
  for (var product in cart) {
    cart.length += cart[product];
  }
  session.cart = cart;
  var countProducts = Object.values(cart);

  var productsId = Object.keys(cart);
  productsId.shift();

  //remove length in countProducts
  var cartLength = countProducts.shift();

  var records = await Products.find().where("_id").in(productsId).exec();

  res.locals.session = session;
  res.locals.cart = records;
  res.locals.countProducts = countProducts;
  res.locals.cartLength = cartLength;
  next();
};
