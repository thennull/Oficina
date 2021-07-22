const mongoose = require("mongoose");

var CarroSchema = new mongoose.Schema({
  marca: {
    type: String,
    required: [true, "Insira uma marca"],
  },
  modelo: {
    type: String,
    motor: {
      versao: {
        type: String,
      },
      comb: {
        type: String,
      },
    },
    required: [true, "Insira um modelo"],
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
  },
  visita: {
    type: Date,
    required: [true, "Insira a data da visita"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  KM: {
    type: String,
    required: [true, "Insira um valor de KM"],
  },
  OS: [Number],
});

module.exports = mongoose.model("Carro", CarroSchema);
