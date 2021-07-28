const express = require("express");
const { getUsers } = require("../controllers/users");
const { filterResults } = require("../middlewares/advancedFilter");

// Routes
var router = express.Router();

router.route("/").get(filterResults, getUsers);

module.exports = router;
