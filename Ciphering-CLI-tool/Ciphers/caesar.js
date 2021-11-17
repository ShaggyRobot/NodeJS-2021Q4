const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Caesar extends Transform {
  constructor(opt) {
    super();
    if (!Number.isNaN(parseInt(opt, 10)) && (parseInt(opt, 10) === 1 || parseInt(opt, 10) === 0)) {
      this.shift = parseInt(opt, 10) === 1 ? 1 : -1;
    } else {
      console.error(`Invalid flag "${opt}" for Caesar. Either "0" or "1" expected.`);
      process.exit(1);
    }
  }

  _transform(chunk, enc, callback) {
    this.push(shiftStr(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = { Caesar };

// class InputError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = this.constructor.name;
//     Error.captureStackTrace(this, this.constructor);
//   }
// }
