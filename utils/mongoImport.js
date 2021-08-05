const User = require("../models/users");
const Carro = require("../models/carros");
const Manutencao = require("../models/manutencao");
const Servico = require("../models/servicos");
const Produto = require("../models/produtos");
const dotenv = require("dotenv");
const database = require("../middlewares/database");
const path = require("path");
const fs = require("fs");
const minimist = require("minimist");

// Env variables
dotenv.config({ path: "../config/config.env" });

// Abre conexão com o banco
database();

// Models enum

var models = {
  "users.json": User,
  "carros.json": Carro,
  "manutencao.json": Manutencao,
  "servicos.json": Servico,
  "produtos.json": Produto,
};

// Load path

let dir = path.resolve(__dirname + "/../data");
let files = fs.readdirSync(dir);

// Setup

var args = minimist(process.argv.slice(2), {
  boolean: ["create", "delete", "help"],
});

main();

// Functions ############

function importData(model, filepath) {
  return new Promise(function (res, rej) {
    fs.readFile(filepath, { encoding: "utf8" }, function (error, data) {
      if (error) rej(error);
      data = JSON.parse(data);
      model.create(data, function (error) {
        if (error) rej(error);
        res("Imported - Done!");
      });
    });
  });
}

function insertMany() {
  var promises = undefined;
  if (Array.isArray(files) && files.length > 0) {
    promises = files.map(function (file) {
      if (file in models) {
        return importData(models[file], path.join(dir, file));
      } else {
        return Promise.reject("Could not import data from: " + file);
      }
    });
    return Promise.all(promises);
  }
  return "";
}

function deleteData() {
  var promises = [];
  if (Array.isArray(files) && files.length > 0) {
    files.forEach(function (file) {
      promises.push(
        new Promise(function (res, rej) {
          try {
            models[file].deleteMany(function (error) {
              if (error) rej(error);
              res("Deleted - Done!");
            });
          } catch (err) {
            rej(`We got this ERROR:  ${err}`);
          }
        })
      );
    });
    return Promise.all(promises);
  }
  return "";
}

async function main() {
  if (args.help) {
    printHelp();
    process.exit(0);
  }
  if (args.create) {
    results(insertMany);
  } else if (args.delete) {
    results(deleteData);
  } else {
    console.log("Bad options!\n");
    printHelp();
    process.exit(1);
  }
}

function results(execFunc) {
  execFunc()
    .then(function (done) {
      done.forEach(function (result) {
        console.log(result);
      });
      process.exit(0);
    })
    .catch(function (error) {
      console.error(error);
      process.exit(1);
    });
}

function printHelp() {
  console.log("This script usage:");
  console.log("");
  console.log("--help           print this help");
  console.log("--create         Import all on: " + dir);
  console.log("");
  console.log("--delete         Delete all on: " + dir);
  console.log("");
  return;
}
