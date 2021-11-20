const { errorHandler } = require('./error-handler');

console.error = jest.fn();
process.exit = jest.fn();

describe('errorHandler', () => {
  errorHandler('Error');
  it('Should call console.error', () => {
    expect(console.error).toBeCalledTimes(1);
  });
  it('Should call process.exit', () => {
    expect(process.exit).toBeCalledTimes(1)
  })
});
