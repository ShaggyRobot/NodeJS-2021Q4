const { MyRead } = require('./myRead');
const { errorHandler } = require('../Errors/error-handler');
const { InputError } = require('../Errors/input-error');

function getReadStream(path) {
  if (!path) {
    return process.stdin;
  }
  return new MyRead(path).on('error', (error) => {
    errorHandler(new InputError(`Can't read file at "${path}": [${error.message}].`));
  });
}

module.exports = { getReadStream };
