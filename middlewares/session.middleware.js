var Sessions = require('../models/sessions.model');

module.exports.requireSession = async function(req, res, next) {
  //check cookie
  var cookieIdd = req.signedCookies.cookieId;
  if(!cookieIdd) {
    res.cookie('cookieId', '1234567', {
      signed : true,
    });
    res.redirect('/products');
    return;
  }

  //check session
  var session = await Sessions.findOne({cookieId: cookieIdd});
  if(!session.cookieId){
    session = {
      cookieId: cookieIdd,
      cart : {
        length : 0,
      },
    };
    Sessions.create(
    session,
    function (err, small) {
      if (err) return handleError(err);
      // saved!
    });
    res.redirect('/products');
    return;
  }

  res.locals.session = session;
  res.locals.cookieId = cookieIdd;
  next();
}