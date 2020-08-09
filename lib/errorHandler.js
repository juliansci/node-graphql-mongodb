function errorHandler(error) {
  console.error(error);
  throw new Error('An error has occurred. Please try later.');
}

module.exports = errorHandler;