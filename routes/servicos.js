const express = require("express");
const { privateRoute } = require("../middlewares/protectRoutes");
const { authorize } = require("../middlewares/auth");
const { filterResults } = require("../middlewares/advancedFilter");
const {
  getAllServicos,
  getOneServico,
  updateServico,
  deleteServico,
  createServico,
} = require("../controllers/servicos");

var router = express.Router();

router
  .route("/")
  .get(filterResults, getAllServicos)
  .post(privateRoute, authorize(["usuario", "admin"]), createServico);

router
  .route("/:servId")
  .get(getOneServico)
  .put(privateRoute, authorize(["usuario", "admin"]), updateServico)
  .delete(privateRoute, authorize(["usuario", "admin"]), deleteServico);

module.exports = router;
