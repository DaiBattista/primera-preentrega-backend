const { Router } = require('express');
const { v4: uuidV4 } = require('uuid');

const encoding = 'utf-8';

const products = require('../products.json');

const router = Router();

console.log('products route');

router.get('/products', (req, res) => {
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.status(200).json(products);
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
    const newProduct = {
        ...body,
        id: uuidV4(), title: 'Balón de voleibol Rubberised', description: 'Confeccionado en cuero vacuno cromo, natural, con cobertura realizada en caucho, calidad «Rubberised», 18 gajos, tamaño y peso reglamentario, vulcanizado, con cámara butílica flotante, con devanado en hilo de nylon de primera calidad, válvula intercambiable.',
        price: 10000, thumbnail: 'Sin imagen', code: 2255, stock: 10, status: true, category: 'Voley'
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