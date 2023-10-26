const express = require("express");
const productSchema = require("./products");

const productsRouter = express.Router();

// Middleware para verificar que el id del producto sea único
productsRouter.use((req, res, next) => {
  const productId = req.params.pid;

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      return next(err);
    }

    const products = JSON.parse(data);

    const product = products.find((p) => p.id === productId);

    if (product) {
      return next(new Error("El id del producto ya existe"));
    }

    next();
  });
});

// Ruta raíz GET
productsRouter.get("/", (req, res) => {
  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      return next(err);
    }

    const products = JSON.parse(data);

    res.send(products);
  });
});

// Ruta GET /:pid
productsRouter.get("/:pid", (req, res) => {
  const productId = req.params.pid;

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      return next(err);
    }

    const products = JSON.parse(data);

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.sendStatus(404);
    }

    res.send(product);
  });
});

// Ruta POST /
productsRouter.post("/", (req, res) => {
  const product = new productSchema({
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: req.body.status || true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails || [],
  });

  product.save((err, product) => {
    if (err) {
      return next(err);
    }

    fs.writeFile("./data/products.json", JSON.stringify([product], null, 2), (err) => {
      if (err) {
        return next(err);
      }

      res.sendStatus(201);
    });
  });
});

// Ruta PUT /:pid
productsRouter.put("/:pid", (req, res) => {
  const productId = req.params.pid;

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      return next(err);
    }

    const products = JSON.parse(data);

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.sendStatus(404);
    }

    const updatedProduct = Object.assign({}, product, req.body);

    updatedProduct.save((err, product) => {
      if (err) {
        return next(err);
      }

      fs.writeFile("./data/products.json", JSON.stringify([updatedProduct], null, 2), (err) => {
        if (err) {
          return next(err);
        }

        res.sendStatus(200);
      });
    });
  });
});

productsRouter.delete("/:pid", (req, res) => {
  const productId = req.params.pid;

  fs.readFile("./data/products.json", (err, data) => {
    if (err) {
      return next(err);
    }

    const products = JSON.parse(data);

    const product = products.find((p) => p.id === productId);

    if (!product) {
      return res.sendStatus(404);
    }

    products = products.filter((p) => p.id !== productId);

    fs.writeFile("./data/products.json", JSON.stringify(products, null, 2), (err) => {
      if (err) {
        return next(err);
      }

      res.sendStatus(200);
    });
  });
});