const express = require('express');
const uuid = require('uuid');
const carts = require('../carts.json');

const router = express.Router();

router.get('/carts', (req, res) => {
    res.json(carts);
});

router.post('/api/carts', (req, res) => {
    const newCart = {
        id: uuid.v4(),
        products: [],
    };
    carts.push(newCart);
    res.status(201).json(newCart);
});

router.get('/api/carts/:cid', (req, res) => {
    const cartId = req.params.cid;
    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({
            message: `El carrito con ID ${cartId} no existe.`,
        });
    }
    res.json(cart);
});

router.post('/api/carts/:cid/products', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.body.productId;
    const quantity = req.body.quantity;

    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({
            message: `El carrito con ID ${cartId} no existe.`,
        });
    }

    const product = cart.products.find((product) => product.id === productId);

    if (!product) {
        cart.products.push({
            productId,
            quantity,
        });
    }
    else {
        product.quantity += quantity;
    }
    saveCarts();
    res.json(product);
});

function saveCarts() {
    const data = JSON.stringify(carts);
    fs.writeFile('../carts.json', data);
}

module.exports = router;