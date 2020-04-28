var Product = require('../models/product.model');

module.exports.index = async function(req, res) {
  if(!req.signedCookies.cookiesId){
  res.cookie('cookiesId', '12345', {
    signed : true,
  });
  console.log('Set cookies!');
  }

  var products = await Product.find();

  console.log(req.signedCookies);
  res.render('products/index', {
    products : products
  });
}