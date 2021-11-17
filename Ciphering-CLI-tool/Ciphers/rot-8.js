const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Rot8 extends Transform {
  constructor(opt) {
    super();
    if (!Number.isNaN(parseInt(opt, 10)) && (parseInt(opt, 10) === 1 || parseInt(opt, 10) === 0)) {
      this.shift = parseInt(opt, 10) === 1 ? 8 : -8;
    } else {
      console.error(`Invalid flag "${opt}" for Rot8. Either "0" or "1" expected.`);
      process.exit(1);
    }
  }

  _transform(chunk, enc, callback) {
    this.push(shiftStr(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = { Rot8 };
