const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Rot8 extends Transform {
  constructor(opt) {
    super();
    this.shift = parseInt(opt, 10) === 1 ? 8 : -8;
  }

  _transform(chunk, enc, callback) {
    this.push(shiftStr(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = { Rot8 };
