const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { asyncHandler } = require("../utils/asyncHandler");
const ErrorResponse = require("../utils/ErrorResponse");

exports.privateRoute = asyncHandler(async function (req, res, next) {
  var tokenKey = undefined;
  if (req.headers.authorization) {
    tokenKey = req.headers.authorization.split(" ")[1];
  } else {
    tokenKey = req.cookies.token || req.cookies.resetToken;
  }

  if (!tokenKey) return next(new ErrorResponse(`Invalid access!`, null, 401));

  if (jwt.verify(tokenKey, process.env.JWT_SECRET)) {
    req.user = jwt.decode(tokenKey)["id"];
  } else {
    return next(new ErrorResponse(`Invalid Token!`, null, 401));
  }

  next();
});
