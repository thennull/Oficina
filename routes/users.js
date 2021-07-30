const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const {
  getUsers,
  postUser,
  getOneUser,
  updateUser,
  deleteUser,
  getResetLink,
} = require("../controllers/users");

// Routes
var router = express.Router();

router.route("/").get(filterResults, getUsers).post(postUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/resetpassword").get(getResetLink);

module.exports = router;
