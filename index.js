require("dotenv").config();

var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");

var productsRoute = require("./routes/products.route");
var cartRoute = require("./routes/cart.route");

var app = express();
var port = 3000;

app.set("views", "./view");
app.set("view engine", "pug");

app.use(cookieParser(process.env.SESSION_SECRECT));

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });

app.use("/products", productsRoute);
app.use("/cart", cartRoute);

app.get("/", (req, res) => res.render("index"));
app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
