const { spawn } = require('child_process');

test('sanity check', () => {
  expect(false).toBe(false);
});

const correctCases = [
  ['-c', 'C1-C1-R0-A', '-i', 'Ciphering-CLI-tool/input.txt', '-o', 'Ciphering-CLI-tool/output.txt'],
  [
    '-c',
    'C1-C0-A-R1-R0-A-R0-R0-C1-A',
    '-i',
    'Ciphering-CLI-tool/input.txt',
    '-o',
    'Ciphering-CLI-tool/output.txt'
  ],
  ['-c', 'A0', '-i', 'Ciphering-CLI-tool/input.txt', '-o', 'Ciphering-CLI-tool/output.txt'],
  [
    '-c',
    'A-A-A-R1-R0-R0-R0-C1-C1-A',
    '-i',
    'Ciphering-CLI-tool/input.txt',
    '-o',
    'Ciphering-CLI-tool/output.txt'
  ],
  [
    '-c',
    'C1-R1-C0-C0-A-R0-R1-R1-A-C1',
    '-i',
    'Ciphering-CLI-tool/input.txt',
    '-o',
    'Ciphering-CLI-tool/output.txt'
  ]
];


describe.each(correctCases)('Correct cases should pass', (...args) => {
  it('should beep on correct args', (done) => {
    const response = spawn('node', ['Ciphering-CLI-tool/ciphering-cli-tool.js', ...args]);
    const chunks = [];

    response.stdout.on('data', (chunk) => {
      chunks.push(chunk);
    });

    response.stderr.on('data', (chunk) => {
      response.kill();
      done();
    });

    response.stdout.on('end', () => {
      const output = Buffer.concat(chunks).toString();
      expect(output).toEqual('Beep!\n');
      response.kill();
      done();
    });
  });
})
