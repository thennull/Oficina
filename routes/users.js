const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const {
  getUsers,
  postUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");

// Routes
var router = express.Router();

router.route("/").get(filterResults, getUsers).post(postUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
