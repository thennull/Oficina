const mongoose = require("mongoose");

var CarroSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: [true, "Insira uma marca"],
  },
  modelo: {
    type: String,
    required: [true, "Insira um modelo"],
  },
  motor: {
    versao: {
      type: String,
    },
    fuel: {
      type: String,
    },
  },
  ano: {
    type: Date,
    required: [true, "Insira o ano do veículo"],
  },
  cor: {
    type: String,
  },
  placa: {
    type: String,
    required: [true, "Insira a placa do veículo"],
    unique: true,
  },
  cadastro: {
    type: Date,
    required: [true, "Insira a data da visita"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  KM: {
    type: Number,
    required: [true, "Insira um valor de KM"],
  },
  OS: [String],
});

module.exports = mongoose.model("Carro", CarroSchema);
