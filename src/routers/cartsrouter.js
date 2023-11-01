const express = require('express');
const uuid = require('uuid');
const fs = require('fs');
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
    saveCarts(); 
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

router.post('/api/carts/:cid/products/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    const cart = carts.find((cart) => cart.id === cartId);

    if (!cart) {
        return res.status(404).json({
            message: `El carrito con ID ${cartId} no existe.`,
        });
    }

    const product = cart.products.find((product) => product.code === productId);

    if (!product) {
        cart.products.push({
            code: productId,
            quantity,
        });
    } else {
        product.quantity += quantity;
    }

    saveCarts();

    res.json(product);
});

function saveCarts() {
    const data = JSON.stringify(carts);
    fs.writeFileSync('../carts.json', data);
}

module.exports = router;