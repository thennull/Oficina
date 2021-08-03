const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const { authorize } = require("../middlewares/auth");
const { privateRoute } = require("../middlewares/protectRoutes");
const {
  getAllCarros,
  getOneCarro,
  postCarro,
  putCarro,
  delCarro,
} = require("../controllers/carros");

var router = express.Router();

router.route("/").get(filterResults, getAllCarros);

router.route("/:carroId").get(getOneCarro);

// route.use(privateRoute, authorize(['usuario', 'admin']));

router.route("/carro/:carroId").post(postCarro).put(putCarro).delete(delCarro);

module.exports = router;
