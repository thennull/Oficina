const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const { privateRoute } = require("../middlewares/protectRoutes");
const { authorize } = require("../middlewares/auth");
const {
  getProdutos,
  getProduto,
  postProduto,
  putProduto,
  delProduto,
} = require("../controllers/produtos");

var router = express.Router();

router
  .route("/")
  .get(filterResults, getProdutos)
  .post(privateRoute, authorize(["ADMIN"]), postProduto);

router
  .route("/:prodId")
  .get(getProduto)
  .put(privateRoute, authorize(["ADMIN", "USUARIO"]), putProduto)
  .delete(privateRoute, authorize(["ADMIN"]), delProduto);

module.exports = router;
