var express = require("express");
var router = express.Router();
var controller = require("../controllers/cart.controller");

var sessionMiddleware = require("../middlewares/session.middleware");
var cookieMiddleware = require("../middlewares/cookies.middleware");

router.get(
  "/",
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.index
);

router.get(
  "/add/:productId",
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.addToCart
);

router.get(
  "/delete/:productId",
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.removeFromCart
)

router.post(
  "/update/:productId",
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.updateToCart
)

module.exports = router;
