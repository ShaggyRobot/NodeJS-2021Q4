const { MyRead } = require('./myRead');
jest.mock('./myRead');
const { getReadStream } = require('./getReadStream');

describe('getReadStream', () => {
  it('Should return stdin if path is empty', () => {
    const result = getReadStream('');
    expect(result).toEqual(process.stdin);
  });

  it('Should call MyRead with given path', () => {
    const path = 'some/unexistent/path.doot';
    const result = getReadStream(path);
    expect(MyRead).toHaveBeenCalledTimes(1);
    expect(MyRead.mock.calls[0][0]).toEqual(path);
    // expect(MyRead.mock.instances[0].on).toBeCalledWith('error', expect.any(Function));
  });
});

// node ciphering-cli-tool.js -i 'input.txt' -o 'output.txt' -c 'C1-R1-A-C0'
