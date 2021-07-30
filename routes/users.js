const express = require("express");
const { filterResults } = require("../middlewares/advancedFilter");
const { privateRoute } = require("../middlewares/protectRoutes");
const { authorize } = require("../middlewares/auth");
const {
  getUsers,
  postUser,
  getOneUser,
  updateUser,
  deleteUser,
  getResetLink,
  putPassword,
  userLogin,
} = require("../controllers/users");

// Routes
var router = express.Router();

router
  .route("/")
  .get(filterResults, getUsers)
  .post(privateRoute, authorize(["admin"]), postUser);

router
  .route("/:userId")
  .get(getOneUser)
  .put(privateRoute, authorize(["usuario", "admin"]), updateUser)
  .delete(privateRoute, authorize(["admin"]), deleteUser);

router.route("/:userId/resetpassword").get(getResetLink);

router.route("/:userId/:key").put(privateRoute, putPassword);

router.route("/login").post(userLogin);

module.exports = router;
