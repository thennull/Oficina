const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const { privateRoute } = require("../middlewares/protectRoutes");
const {
  getUsers,
  postUser,
  getOneUser,
  updateUser,
  deleteUser,
  getResetLink,
  putPassword,
} = require("../controllers/users");

// Routes
var router = express.Router();

router.route("/").get(filterResults, getUsers).post(postUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

router.route("/:userId/resetpassword").get(getResetLink);

router.route("/:userId/:key").put(privateRoute, putPassword);

module.exports = router;
