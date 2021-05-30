class CustomError extends Error {
  constructor(message, code = 500, data = {}) {
    super();
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

module.exports = {
  CustomError,
};
