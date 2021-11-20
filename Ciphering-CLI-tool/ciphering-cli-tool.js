const { pipeline } = require('stream');
const process = require('process');

const { argvParser } = require('./Parsers/argv-parser');
const { errorHandler } = require('./Errors/error-handler');
const { getReadStream } = require('./Streams/getReadStream');
const { getWriteStream } = require('./Streams/myWrite');
const { getTransforms } = require('./Streams/transforms');

try {
  const argsParsed = argvParser(process.argv);
  const read = getReadStream(argsParsed.inputPath);
  const write = getWriteStream(argsParsed.outputPath);
  const transforms = getTransforms(argsParsed.config);

  pipeline(read, ...transforms, write, (error) => {
    if (error) {
      errorHandler(error);
    } else {
      console.log('Beep!');
    }
  });
} catch (error) {
  errorHandler(error);
}
