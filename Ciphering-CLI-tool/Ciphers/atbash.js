const { Transform } = require('stream');
const { reverseStr } = require('./reverse');

class Atbash extends Transform {
  _transform(chunk, enc, callback) {
    this.push(reverseStr(chunk.toString()));
    callback();
  }
}

module.exports = { Atbash };
