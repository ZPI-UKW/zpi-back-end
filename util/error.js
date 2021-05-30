class CustomError extends Error {
  constructor(message, statusCode = 500, data = {}) {
    super();
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}

module.exports = {
  CustomError,
};
