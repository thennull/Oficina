const mongoose = require("mongoose");

var ServicoSchema = new mongoose.Schema({
  codigo: {
    type: Number,
  },
  desc: {
    type: String,
    maxLength: 30,
    required: [true, "Insira uma descrição de serviço"],
  },
  valor: {
    type: Number,
    required: [true, "Insira um valor de serviço"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Servico", ServicoSchema);
