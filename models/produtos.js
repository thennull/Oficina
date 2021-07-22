const mongoose = require("mongoose");

var ProdutoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, "Insira o codigo do produto"],
  },
  desc: {
    type: String,
    maxLength: 40,
  },
  name: {
    type: String,
    maxLength: 20,
  },
  price: {
    type: Number,
    required: [true, "Insira o valor do produto"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Produto", ProdutoSchema);
