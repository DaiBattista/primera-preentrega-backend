const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    id: { type: String, unique: true },
    products: [
        {
            id: { type: String },
            quantity: { type: Number },
        },
    ],
});

module.exports = cartSchema;