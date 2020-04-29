module.exports.requireCookieId = async function (req, res, next) {
  //check cookie
  var cookieId = req.signedCookies.cookieId;
  if (!cookieId) {
    res.cookie("cookieId", "1234567", {
      signed: true,
    });
    res.redirect("/products");
    return;
  }
  res.locals.cookieId = cookieId;
  next();
};
