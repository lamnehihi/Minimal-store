const express = require('express');
const app = express();
const port = 3000;

var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');

app.use('/product', productRoute);
app.use('/cart', cartRoute);

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))