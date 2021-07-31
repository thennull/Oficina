const User = require("../models/users");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.authorize = function (role) {
  return asyncHandler(async function (req, res, next) {
    if (!req.user)
      return next(
        new ErrorResponse("Not authenticated to access this route", null, 401)
      );
    let user = await User.findOne({ _id: req.params.userId }).exec();

    if (!user) return next(new ErrorResponse("User not found", null, 400));
    let { role: authRole } = await User.findOne({ _id: req.user })
      .select("role")
      .lean()
      .exec();

    if (!role.includes(authRole))
      return next(
        new ErrorResponse("Not authorized to access this route", null, 401)
      );

    if (
      role == "usuario" &&
      req.params.userId == user.id.toString() &&
      req.method == "PUT"
    ) {
      return next();
    } else if (authRole == "admin") {
      return next();
    } else {
      return next(new ErrorResponse("No access to this route", null, 401));
    }
  });
};
