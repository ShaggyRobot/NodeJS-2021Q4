const { Transform } = require('stream');
const { shiftStr } = require('./shift');

class Caesar extends Transform {
  constructor(opt) {
    super();
    this.shift = parseInt(opt, 10) === 1 ? 1 : -1;
  }

  _transform(chunk, enc, callback) {
    this.push(shiftStr(chunk.toString(), this.shift));
    callback();
  }
}

module.exports = { Caesar };
