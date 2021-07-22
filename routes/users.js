const express = require("express");
const { getUsers } = require("../controllers/users");

// Routes
var router = express.Router();

router.route("/").get(getUsers);

module.exports = router;
