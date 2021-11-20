const { FlagError } = require('./flag-error');

describe('FlagError', () => {
  it('Should extend Error class', () => {
    instance = new FlagError();
    expect(instance instanceof Error).toBe(true);
  });
});
