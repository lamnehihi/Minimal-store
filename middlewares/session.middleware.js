var Sessions = require("../models/sessions.model");

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
