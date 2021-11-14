const fs = require('fs');
const { Writable } = require('stream');

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
    fs.write(this.fd, chunk + '\n', callback);
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

module.exports = { MyWrite };
