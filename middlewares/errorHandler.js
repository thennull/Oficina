const ErrorResponse = require("../utils/ErrorResponse");
const { TokenExpiredError } = require("jsonwebtoken");

exports.errorDefault = async function (error, req, res, next) {
  var failure = error;
  if (error.origin instanceof TokenExpiredError) {
    failure.statusCode = 401;
    failure.reason = "Token Expired - not allowed to access!";
  }

  res.status(failure.statusCode || 500).json({
    success: false,
    error: failure.reason || "internal Error",
    message: failure.origin,
  });
};
