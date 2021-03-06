const mongoose = require("mongoose");
const User = require("../models/users");
const Carro = require("../models/carros");
const Produto = require("../models/produtos");
const Servico = require("../models/servicos");
const { start } = require("./__test__/serverTest");
const _ = require("lodash");

global.newId = function () {
  return mongoose.Types.ObjectId();
};

global.cookie = "";

global.models = {
  Carro,
  User,
  Produto,
  Servico,
};

var server = undefined;

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

      await Promise.all(
        [Carro, User, Produto, Servico].map(function (model) {
          return model.init();
        })
      );

      server = start.listen(4000);
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
});

afterAll(async function () {
  await mongoose.disconnect();
  server.close();
});
