require('dotenv').config();

var express = require('express');
var app = express();
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

var port = 3000;

app.set('views', './view');
app.set('view engine', 'pug');

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))