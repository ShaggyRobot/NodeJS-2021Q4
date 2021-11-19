const fs = require('fs');
const { Writable } = require('stream');
const { OutputError } = require('../Errors/output-error');

class MyWrite extends Writable {
  constructor(path) {
    super();
    this.path = path;
  }

  _construct(callback) {
    fs.open(this.path, 'a', (err, fd) => {
      if (err) {
        this.destroy(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _write(chunk, encoding, callback) {
    fs.write(this.fd, chunk, callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

function getWriteStream(path) {
  if (!path) {
    return process.stdout;
  }
  return new MyWrite(path).on('error', (error) => {
    throw new OutputError(`Can't write to "${path}": ${error.message}`);
  });
}

module.exports = { getWriteStream };
