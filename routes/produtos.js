const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const { privateRoute } = require("../middlewares/protectRoutes");
const { authorize } = require("../middlewares/auth");

var router = express.Router();

module.exports = router;
