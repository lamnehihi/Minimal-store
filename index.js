require('dotenv').config();

var express = require('express');
var app = express();
var mongoose = require('mongoose');

var port = 3000;

mongoose.connect(process.env.MONGO_URL);

var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))