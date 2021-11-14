const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Caesar extends Transform {
  constructor(opt) {
    super();
    if (!isNaN(parseInt(opt)) && (parseInt(opt) === 1 || parseInt(opt) === 0)) {
      this.shift = opt == 1 ? 1 : -1;
    } else {
      console.error(`Invalid flag "${opt}" for Caesar. Either "0" or "1" expected.`);
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
