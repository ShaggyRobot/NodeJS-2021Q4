const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Rot8 extends Transform {
  constructor(opt) {
    super();
    if (!isNaN(parseInt(opt)) && (parseInt(opt) == 1 || parseInt(opt) == 0)) {
      this.shift = opt == 1 ? 8 : -8;
    } else {
      console.error(`Invalid flag "${opt}" for Rot8. Either "0" or "1" expected.`)
      process.exit(1)
    }
  }
  _transform(chunk, enc, callback) {
    this.push(shiftStr(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = { Rot8 };
