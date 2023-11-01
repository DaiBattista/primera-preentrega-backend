const { Router } = require('express');
const { v4: uuidV4 } = require('uuid');
const encoding = 'utf-8';
const products = require('../products.json');
const router = Router();

router.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(products);
});

router.get('/products/:pid', (req, res) => {
    const pid = req.params.pid;
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(product);
});

router.put('/:pid', (req, res) => {
    const pid = req.params.pid;
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    for (const key in req.body) {
        if (key !== 'id') {
            product[key] = req.body[key];
        }
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(product);
});

router.post('/products', (req, res) => {
    const { body } = req;
    const { title, description, code, price, stock, category } = body;
    const status = body.status !== undefined ? body.status : true;
    const thumbnails = body.thumbnails || [];

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({
            message: 'Se requieren campos esenciales: title, description, code, price, stock, category.',
        });
    }

    const newProduct = {
        id: uuidV4(),
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
    };

    products.push(newProduct);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(201).json(newProduct);
});

router.delete('/:pid', (req, res) => {
    const pid = req.params.pid;
    const product = products.find((product) => product.id === pid);

    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    products.splice(products.indexOf(product), 1);

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json({ message: 'Producto eliminado' });
});

module.exports = router;