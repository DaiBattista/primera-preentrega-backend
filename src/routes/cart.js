const express = require("express");
const cartSchema = require("./models/cart");

const cartsRouter = express.Router();

cartsRouter.post("/", (req, res) => {
    const cart = new cartSchema({
        id: Math.random().toString(36).substr(7),
        products: [],
    });

    cart.save((err, cart) => {
        if (err) {
            return next(err);
        }

        fs.writeFile("./data/carts.json", JSON.stringify([cart], null, 2), (err) => {
            if (err) {
                return next(err);
            }

            res.sendStatus(201);
        });
    });
});

// Ruta GET /:cid
cartsRouter.get("/:cid", (req, res) => {
    const cartId = req.params.cid;

    fs.readFile("./data/carts.json", (err, data) => {
        if (err) {
            return next(err);
        }

        const carts = JSON.parse(data);

        const cart = carts.find((c) => c.id === cartId);

        if (!cart) {
            return res.sendStatus(404);
        }

        res.send(cart);
    });
});

// Ruta POST /:cid/product/:pid
cartsRouter.post("/:cid/product/:pid", (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;

    fs.readFile("./data/carts.json", (err, data) => {
        if (err) {
            return next(err);
        }

        const carts = JSON.parse(data);

        const cart = carts.find((c) => c.id === cartId);

        if (!cart) {
            return res.sendStatus(404);
        }

        const product = cart.products.find((p) => p.id === productId);

        if (product) {
            product.quantity++;
        } else {
            product = {
                id: productId,
                quantity: 1,
            };
        }

        cart.products.push(product);

        fs.writeFile("./data/carts.json", JSON.stringify(carts, null, 2), (err) => {
            if (err) {
                return next(err);
            }

            res.sendStatus(200);
        });
    });
});