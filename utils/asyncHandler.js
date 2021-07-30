const ErrorResponse = require("./ErrorResponse");

exports.asyncHandler = function (func) {
  return function (req, res, next) {
    return Promise.resolve(func(req, res, next)).catch(function (error) {
      next(new ErrorResponse("Failed to execute the controller", error, 400));
    });
  };
};
