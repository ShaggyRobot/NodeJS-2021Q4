const { pipeline } = require('stream');
const process = require('process');

const { argvParser } = require('./Parsers/argv-parser');
const { errorHandler } = require('./Errors/error-handler');
const { getReadStream } = require('./Streams/myRead');
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
    }
  });
} catch (error) {
  errorHandler(error);
}
