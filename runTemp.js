const fs = require("fs");
const path = require("path");

let ids = [];

let file = fs.readFileSync(path.resolve("carros.json"), { encoding: "utf8" });

file = JSON.parse(file);

ids = file.map(function (id) {
  return id.client;
});

let users = fs.readFileSync(path.resolve("data/users.json"), {
  encoding: "utf8",
});

users = JSON.parse(users);

for (let idx in ids) {
  users[idx]["_id"] = ids[idx];
}

fs.writeFileSync(path.resolve("data/users.json"), JSON.stringify(users));
