const fetch = require("node-fetch");

// Users

var url = "http://localhost:4000/api/v1/";

var fetchOne = async function (endPoint, param) {
  let result = await fetch(url + endPoint + param);
  return await result.json();
};

var fetchMany = async function (endPoint, params) {
  let results = await fetch(url + endPoint + params);
  return results.json();
};

var updateUser = async function (endPoint, param, data) {
  let result = await fetch(url + endPoint + param, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: { "content-type": "application/json", cookie: global.cookie },
  });

  return await result.json();
};

var deleteUser = async function (endPoint, param) {
  let result = await fetch(url + endPoint + param, {
    method: "DELETE",
  });
  return await result.json();
};

var createUser = async function (endPoint, data) {
  let result = await fetch(url + endPoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  return await result.json();
};

var login = async function (endPoint, data) {
  let result = await fetch(url + endPoint, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });
  if (result.status == 200)
    global.cookie = result.headers.get("set-cookie")?.split(";")[0];
  return await result.json();
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  fetchMany,
  fetchOne,
  login,
};

/* login("users/user/login", {
  email: "thennull.dev@gmail.com",
  password: "linuxbox",
}).then(function (data) {
  console.log(data);
}); */
