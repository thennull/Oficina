const ErrorResponse = require("./ErrorResponse");

exports.asyncHandler = function (func) {
  return function (req, res, next) {
    return Promise.resolve(func(req, res, next)).catch(next);
  };
};
