const ErrorResponse = require("../utils/ErrorResponse");

exports.errorDefault = async function (error, req, res, next) {
  var failure = error;

  if (!(error instanceof ErrorResponse))
    return res.status(500).json({
      success: false,
      message: error,
      error: error.reason,
    });

  res.status(failure.statusCode || 500).json({
    success: false,
    error: failure.reason || `internal Error: ${failure.toString()}`,
  });
};
