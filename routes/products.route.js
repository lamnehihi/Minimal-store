var express = require('express');
var router = express.Router();
var controller = require('../controllers/products.controller');
var sessionMiddleware = require('../middlewares/session.middleware');

router.get('/', sessionMiddleware.requireSession, controller.index);

module.exports = router;