const { ConfigError } = require('../Errors/config-error');

const ciphers = {
  C: ['0', '1'],
  R: ['0', '1'],
  A: ''
};

function validate(cfg) {
  for (const option of cfg.split('-')) {
    if (
      !(Object.keys(ciphers).includes(option[0]) && ciphers[option[0]].includes(option.slice(1)))
    ) {
      throw new ConfigError(`Invalid option in config ("${option}")`);
    }
  }
}

module.exports = { validate };
