const express = require('express');
const productsRouter = require('./routers/productsrouter');
const indexRouter = require('./routers/indexrouter');
const cartsRouter = require(('./routers/cartsrouter'));
const path = require('path')

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/statics', express.static('public'));

app.use('/', indexRouter);
app.use('/api', productsRouter, cartsRouter);

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
})