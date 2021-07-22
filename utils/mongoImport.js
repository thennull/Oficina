const User = require("../models/users");
const dotenv = require("dotenv");
const database = require("../middlewares/database");
const path = require("path");
const fs = require("fs");
const { mainModule } = require("process");

// Env variables
dotenv.config({ path: "../config/config.env" });

// Abre conexão com o banco
database();

// Load path

let dir = path.resolve(__dirname + "/../data");
let files = fs.readdirSync(dir);

function importData(model, filepath) {
  return new Promise(function (res, rej) {
    fs.readFile(filepath, { encoding: "utf8" }, function (error, data) {
      if (error) rej(error);
      data = JSON.parse(data);
      model.create(data, function (error) {
        if (error) rej(error);
        res("Done");
      });
    });
  });
}

function insertMany() {
  var promises = undefined;
  if (Array.isArray(files) && files.length > 0) {
    promises = files.map(function (file) {
      let filePath = path.join(dir, file);
      switch (file) {
        case "users.json":
          return importData(User, filePath);
        default:
          return Promise.reject("No model for this file: " + file);
      }
    });
    console.log(promises);
    return Promise.all(promises);
  }
  return "";
}

async function main() {
  insertMany()
    .then(function (done) {
      console.log(done);
      process.exit(0);
    })
    .catch(function (error) {
      console.error(error);
      process.exit(1);
    });
}
main();
