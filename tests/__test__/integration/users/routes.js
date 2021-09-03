const express = require("express");
const {
  getUsers,
  postUser,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../../../../controllers/users");

// Routes
var router = express.Router();

router.route("/").get(getUsers).post(postUser);

router.route("/:userId").get(getOneUser).put(updateUser).delete(deleteUser);

module.exports = router;
