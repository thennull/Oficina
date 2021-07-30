class ErrorResponse extends Error {
  constructor(message, error, statusCode) {
    super(message);
    this.reason = this.toString();
    this.statusCode = statusCode;
    this.origin = error || "Resource unavailable!";
  }
}

module.exports = ErrorResponse;
