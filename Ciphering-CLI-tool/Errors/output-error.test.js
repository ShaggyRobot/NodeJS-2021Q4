const { OutputError } = require('./output-error');

describe('OutputError', () => {
  it('Should extend Error class', () => {
    instance = new OutputError();
    expect(instance instanceof Error).toBe(true);
  });
});
