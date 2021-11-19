function errorHandler(err) {
  console.error(`${err.name}: ${err.message}`);
  process.exit(1);
}

module.exports = { errorHandler };
