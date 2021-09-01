const fetch = require("node-fetch");
const { filterResults } = require("../../middlewares/advancedFilter");

// Users

var url = "http://localhost:4000/";

const user = {
  name: "Test User",
  email: "test@gmail.com",
  password: "TestPassword",
  address: "Rua Santinho Linhares 159, Itabira, Minas Gerais 35901, BR",
  phone: "2197599956",
};

var fetchOne = async function (endPoint, param) {
  let result = await fetch(url + endPoint + param);
  return await result.json();
};

var fetchMany = async function (endPoint, params) {
  let results = await fetch(url + endPoint + params);
  return results.json();
};

var updateOne = async function (endPoint, param, data) {
  let result = await fetch(url + endPoint + param, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  return await result.json();
};

var deleteOne = async function (endPoint, param) {
  let result = await fetch(url + endPoint + param, {
    method: "DELETE",
  });
  return await result.json();
};

var createOne = async function (endPoint, data) {
  let result = await fetch(url + endPoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await result.json();
};

module.exports = {
  createOne,
  updateOne,
  deleteOne,
  fetchMany,
  fetchOne,
};
