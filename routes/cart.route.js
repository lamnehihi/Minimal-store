var express = require("express");
var router = express.Router();
var controller = require("../controllers/cart.controller");

var sessionMiddleware = require("../middlewares/session.middleware");
var cookieMiddleware = require("../middlewares/cookies.middleware");
var cartValidate = require("../validate/cart.validate");

router.get(
  "/",
  sessionMiddleware.requireCart,
  controller.index
);

router.get(
  "/add/:productId",
  sessionMiddleware.requireCart,
  controller.addToCart
);

router.get(
  "/delete/:productId",
  sessionMiddleware.requireCart,
  controller.removeFromCart
)

router.post(
  "/update/:productId",
  sessionMiddleware.requireCart,
  cartValidate.postUpdateCart,
  controller.updateToCart
)

module.exports = router;
