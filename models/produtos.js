const mongoose = require("mongoose");

var ProdutoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
    required: [true, "Insira o codigo do produto"],
    unique: true,
  },
  desc: {
    type: String,
    maxLength: 280,
  },
  name: {
    type: String,
    maxLength: 20,
  },
  marca: {
    type: String,
  },
  valor: {
    type: Number,
    required: [true, "Insira o valor do produto"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Produto", ProdutoSchema);
