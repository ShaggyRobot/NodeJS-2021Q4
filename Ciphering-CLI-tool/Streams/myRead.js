const { Readable } = require('stream');
const fs = require('fs');

class MyRead extends Readable {
  constructor(path) {
    super();
    this.path = path;
    this.fd = null;
  }

  _construct(callback) {
    fs.open(this.path, (err, fd) => {
      if (err) {
        callback(err);
      } else {
        this.fd = fd;
        callback();
      }
    });
  }

  _read(bytes) {
    const buffer = Buffer.alloc(bytes);
    fs.read(this.fd, buffer, 0, bytes, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buffer.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, callback) {
    if (this.fd) {
      fs.close(this.fd, (er) => callback(er || err));
    } else {
      callback(err);
    }
  }
}

// function getReadStream(path) {
//   if (!path) {
//     return process.stdin;
//   }
//   return new MyRead(path).on('error', (error) => {
//     errorHandler(new InputError(`Can't read file at "${path}": [${error.message}].`));
//   });
// }

module.exports = { MyRead };
