const { Transform } = require('stream');
const { reverseStr } = require('./reverse.js');

class Atbash extends Transform {
  constructor(opt) {
    super();
    if (opt) {
      console.error(`Invalid flag "${opt}" for Atbash. Atbash does not take flags.`);
      process.exit(1);
    }
  }
  _transform(chunk, enc, callback) {
    this.push(reverseStr(chunk.toString()));
    callback();
  }
}

module.exports = { Atbash };
