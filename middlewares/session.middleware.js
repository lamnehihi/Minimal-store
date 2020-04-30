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

  res.locals.session = session;

  next();
};

module.exports.requireCart = async function (req, res, next) {
  var session = res.locals.session;
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
  var cartByRecords = [];

  //fix order error when records return
  while(cartByRecords.length != records.length) {
    for(var x = 0; x < productsId.length; x++) {
      for(var j = 0; j < records.length; j++) {
        if(productsId[x] == records[j].id) cartByRecords.push(records[j]);
      }
    }
  }

  res.locals.cart = cartByRecords;
  res.locals.countProducts = countProducts;
  res.locals.cartLength = cartLength;

  next();
}
