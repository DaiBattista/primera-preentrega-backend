const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();

app.use(bodyParser.json());

const productsRouter = require("./routes/products");
const cartsRouter = require("./routes/cart");

app.use("/api/products", productsRouter);
app.use("/api/cart", cartsRouter);

app.listen(8080, () => {
    console.log("Servidor escuchando en el puerto 8080");
});