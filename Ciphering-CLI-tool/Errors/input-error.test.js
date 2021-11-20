const { InputError } = require('./input-error');

describe('InputError', () => {
  it('Should extend Error class', () => {
    instance = new InputError();
    expect(instance instanceof Error).toBe(true);
  });
});
