const { ConfigError } = require('../Errors/config-error');
const { FlagError } = require('../Errors/flag-error');

function getFlagParam(argArr, flagArr) {
  let currentFlag = null;
  for (const flag of flagArr) {
    if (argArr.includes(flag)) {
      if (currentFlag || argArr.filter((arg) => arg === flag).length > 1) {
        throw new FlagError(`Duplicate flag "${flag}"`);
      }
      currentFlag = flag;
    }
  }
  return currentFlag && argArr[argArr.indexOf(currentFlag)] !== -1
    ? argArr[argArr.indexOf(currentFlag) + 1]
    : null;
}

function argvParser(argv) {
  const configObj = {};
  configObj.config = getFlagParam(argv, ['-c', '--config']);
  configObj.inputPath = getFlagParam(argv, ['-i', '--input']);
  configObj.outputPath = getFlagParam(argv, ['-o', '--output']);
  if (!configObj.config) throw new ConfigError('No config provided, expected "C", "R" and/or "A".');
  return configObj;
}

module.exports = { argvParser };
