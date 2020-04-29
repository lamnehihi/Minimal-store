var express = require("express");
var router = express.Router();
var controller = require("../controllers/cart.controller");

var sessionMiddleware = require("../middlewares/session.middleware");
var cookieMiddleware = require("../middlewares/cookies.middleware");
var cartValidate = require("../validate/cart.validate");

router.get(
  "/",
  cookieMiddleware.requireCookieId,
  sessionMiddleware.requireSession,
  controller.index
);

router.get(
  "/add/:productId",
  controller.addToCart
);

router.get(
  "/delete/:productId",
  controller.removeFromCart
)

router.post(
  "/update/:productId",
  cartValidate.postUpdateCart,
  controller.updateToCart
)

module.exports = router;
