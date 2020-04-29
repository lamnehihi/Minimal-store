var express = require("express");
var router = express.Router();
var controller = require("../controllers/products.controller");

var sessionMiddleware = require("../middlewares/session.middleware");
var cookieMiddleware = require("../middlewares/cookies.middleware");

router.get(
  "/",
  controller.index
);

module.exports = router;
