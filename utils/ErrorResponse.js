class ErrorResponse extends Error {
  constructor(message, error, statusCode) {
    super(message);
    if (error) this.reason = error.toString();
    else this.reason = "Resource unavailable";
    this.statusCode = statusCode;
  }
}

module.exports = ErrorResponse;
