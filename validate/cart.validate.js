module.exports.postUpdateCart = function(req, res, next) {
  var errors = [];

  if(req.body.countProduct < 0) {
    errors.push("Invalid Quantity !")
  }
  if(errors.length) {
    res.render("cart/index", {
      errors,
      cart: res.locals.cart,
      countProducts: res.locals.countProducts,
      cartLength: res.locals.cartLength,
      x: 0,
    })
    return;
  }

  next();
}
