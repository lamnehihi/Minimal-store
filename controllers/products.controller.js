var Products = require('../models/products.model');
var Sessions = require('../models/sessions.model');

module.exports.index = async function(req, res) {
  var cookieIdd = req.signedCookies.cookieId;
  if(!cookieIdd){
  res.cookie('cookieId', '1234567', {
    signed : true,
  });
  console.log('Set cookie!');
  res.redirect('/products');
  return;
  }

  var session = await Sessions.find({ cookieId: cookieIdd});
  console.log(session);
  if(!session.length){
    Sessions.create(
    {
      cookieId: cookieIdd,
      cart : {
      }
    },
    function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
    console.log('set session !');
    res.redirect('/products');
    return;
  }

  var products = await Products.find();

  console.log(req.signedCookies);
  res.render('products/index', {
    products : products
  });
}