module.exports.index = function(req, res) {
  if(!req.signedCookies.cookiesId){
  res.cookie('cookiesId', '12345', {
    signed : true,
  });
  console.log('Set cookies!');
  }
  console.log(req.signedCookies);
  res.render('products/index');
}