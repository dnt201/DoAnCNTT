const express = require('express');
const cookieParser = require('cookie-parser');

const seedData = require('./config/seedData');

const errorHandler = require('./middlewares/catchError.middleware');

const app = express();
app.use(express.json());
app.use(cookieParser());

const user = require("./routes/user.Route");
const order = require("./routes/order.Route");
const products = require("./routes/product.Route");
const categories = require("./routes/category.Route");

seedData();

app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", products);
app.use("/api/v1", categories);


app.use(errorHandler);
app.use("/upload", express.static("upload"));

module.exports = app;
