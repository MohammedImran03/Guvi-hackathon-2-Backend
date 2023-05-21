const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema({
    productid: {
    type: Number,
    required: true,
  },                          
  name: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  normalprice: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  priceperhour: {
    type: Number,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
  }
});

module.exports = mongoose.model("products", ProductSchema);

