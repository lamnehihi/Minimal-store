module.exports.index = function(req, res) {
  if(!req.cookies.cookiesId){
  res.cookie('cookiesId', '12345');
  console.log('Set cookies!');
  }
  console.log(req.cookies);
  res.render('products/index');
}