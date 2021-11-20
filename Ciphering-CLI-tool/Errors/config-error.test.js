const { ConfigError } = require('./config-error');

describe('ConfigError', () => {
  it('Should extend Error class', () => {
    instance = new ConfigError();
    expect(instance instanceof Error).toBe(true);
  });
});
