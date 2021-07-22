const mongoose = require("mongoose");

var ManutSchema = new mongoose.Schema({
  servicos: [
    { type: mongoose.Schema.ObjectId, ref: "Servico", required: true },
  ],
  produtos: [{ type: mongoose.Schema.ObjectId, ref: "Produto" }],
  status: {
    type: String,
    required: [true, "Insira um status para a OS"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    required: true,
  },
});

ManutSchema.statics.updateTotal = async function (servId, prodId) {
  var serv = 0,
    prod = 0,
    total = 0;
  if (servId) {
    serv = this.servicos.reduce(async function (prev, cur) {
      prev += await this.model("Servico")
        .findOne({ _id: servId })
        .select("valor");
    }, 0);
    total += serv;
  }
  if (prodId) {
    prod = this.servicos.reduce(async function (prev, cur) {
      prev += await this.model("Produto")
        .findOne({ _id: prodId })
        .select("valor");
    }, 0);
    total += prod;
  }
  if (total) {
    this.total = total;
  }
};

module.exports = mongoose.model("Manutencao", ManutSchema);
