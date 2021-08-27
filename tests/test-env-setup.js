const mongoose = require("mongoose");
const User = require("../models/users");
const Carro = require("../models/carros");
const Produto = require("../models/produtos");
const Servico = require("../models/servicos");
const _ = require("lodash");

global.newId = function () {
  return mongoose.Types.ObjectId();
};

global.models = {
  User,
  Carro,
  Produto,
  Servico,
};

global.servData = {
  user: {
    name: "Test User",
    email: "test@gmail.com",
    address: "Rua Santinho Linhares 159, Itabira, Minas Gerais 35901, BR",
    phone: "2197599956",
  },
};

var remove = async function (collection) {
  try {
    await collection.deleteMany({});
    return;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

beforeAll(async function () {
  try {
    if (mongoose.connection.readyState == 0) {
      await mongoose.connect("mongodb://localhost:27017/Oficina_test", {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
      await Promise.all(
        _.map(mongoose.connection.collections, function (value) {
          return remove(value);
        })
      );
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

afterAll(async function () {
  await mongoose.disconnect();
});
