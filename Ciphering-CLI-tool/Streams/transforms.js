const { validate } = require('../Utils/config-validator');
const { Caesar } = require('../Ciphers/caesar');
const { Rot8 } = require('../Ciphers/rot-8');
const { Atbash } = require('../Ciphers/atbash');

const ciphers = {
  C: (a) => new Caesar(a),
  R: (a) => new Rot8(a),
  A: (a) => new Atbash(a)
};

function getTransforms(config) {
  validate(config);
  const configArr = config.split('-');
  const transforms = configArr.map((cfg) => ciphers[cfg[0]](cfg[1]));
  return transforms;
}

module.exports = { getTransforms };
