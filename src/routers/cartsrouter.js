const express = require('express');
const carts = require('../carts.json');

const router = express.Router();

function generateCartId() {
    return Math.floor(Math.random() * 1000000);
}

router.get('/carts', (req, res) => {
    res.json(carts);
});

router.post('/carts', (req, res) => {
    const cartId = generateCartId();
    carts[cartId] = {
        id: cartId,
        products: [],
    };

    res.json({
        id: cartId,
    });
});

router.get('/carts/:cid', (req, res) => {
    const cartId = req.params.cid;

    const cart = carts[cartId];
    if (!cart) {
        return res.status(404).json({
            message: `El carrito con ID ${cartId} no existe.`,
        });
    }

    res.json({
        products: cart.products,
    });
});

router.post('/carts/:cid/products/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity;

    const cart = carts[cartId];
    if (!cart) {
        return res.status(404).json({
            message: `El carrito con ID ${cartId} no existe.`,
        });
    }

    const product = cart.products.find((product) => product.id === productId);

    if (!product) {
        cart.products.push({
            product: productId,
            quantity: quantity,
        });
    } else {
        product.quantity += quantity;
    }

    saveCarts();

    res.json({
        product: product,
    });
});

function saveCarts() {
    const data = JSON.stringify(carts);
    fs.writeFile('../carts.json', data);
}

module.exports = router;