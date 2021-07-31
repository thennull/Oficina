const mongoose = require("mongoose");
const uuid = require("uuid");

var ManutSchema = new mongoose.Schema({
  services: [{ type: mongoose.Schema.ObjectId }],
  products: [{ type: mongoose.Schema.ObjectId }],
  status: {
    type: String,
    required: [true, "Insira um status para a OS"],
  },
  client: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Insira um nome de cliente"],
  },
  employee: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Insira um nome de funcionario"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
  },
  OS: {
    type: String,
    required: true,
    unique: true,
  },
});

ManutSchema.pre("save", function (next) {
  if (!this.OS) {
    this.OS = uuid.v4();
    next();
  } else {
    next();
  }
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
