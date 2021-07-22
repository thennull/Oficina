const User = require("../models/users");
const ErrorResponse = require("../utils/ErrorResponse");
const { asyncHandler } = require("../utils/asyncHandler");

exports.getUsers = asyncHandler(async function (req, res, next) {
  let users = await User.find();

  if (!users)
    return next(
      new ErrorResponse("Could not found any user in our base", null, 400)
    );

  res.status(200).json({
    success: true,
    count: users.length,
    data: users,
  });
});
