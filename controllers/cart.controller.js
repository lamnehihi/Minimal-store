module.exports.index = function(req, res) {
  console.log(req.cookies);
  res.render('cart/index');
}