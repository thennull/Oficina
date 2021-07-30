const User = require("../models/users");
const { asyncHandler } = require("../utils/asyncHandler");
const { ErrorResponse } = require("../utils/ErrorResponse");

exports.authorize = function (role) {
  return asyncHandler(async function (req, res, next) {
    if (!req.user)
      return next(
        new ErrorResponse("Not authorized to access this route", null, 401)
      );
    let user = await User.findOne({ _id: id }).exec();

    if (!user || !role.includes(user.role))
      return next(
        new ErrorResponse("Not authorized to access this route", null, 401)
      );

    if (
      role == "usuario" &&
      req.params.id == user.id.toString() &&
      req.method == "PUT"
    ) {
      return next();
    } else if (role == "admin") {
      return next();
    } else {
      return next(
        new ErrorResponse("Not authorized to access this route", null, 401)
      );
    }
  });
};
