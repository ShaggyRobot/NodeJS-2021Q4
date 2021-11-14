const fs = require('fs');
const { Caesar } = require('./Ciphers/caesar');
const { Rot8 } = require('./Ciphers/rot-8');
const { Atbash } = require('./Ciphers/atbash');
const { pipeline } = require('stream');
const process = require('process');

const ciphers = {
  C: (a) => new Caesar(a),
  R: (a) => new Rot8(a),
  A: (a) => new Atbash(a)
};

async function parseArgv(argv) {
  const ioObj = new Object();
  const argvArr = argv.slice(2);

  // Checking for duplicate options
  if (argvArr.filter((arg) => arg == ('-c' || '-i' || 'o')).length > 1) {
    console.error(`No duplicate options allowed.`);
    process.exit(1);
  }

  // Validating config
  if (argvArr.includes('-c')) {
    for (const arg of argvArr[argvArr.indexOf('-c') + 1].split('-')) {
      if (!Object.keys(ciphers).includes(arg[0])) {
        console.error(
          arg[0] ? `Invalid option "${arg}" in config. Only "C", "R" or "A" expected.` : 'Empty option in config, expected "C", "R" or "A".'
        );
        process.exit(1);
      }
    }
    // Populating transforms array
    ioObj.transformArr = await new Promise((resolve) => {
      resolve(argvArr[argvArr.indexOf('-c') + 1].split('-').map((cfg) => ciphers[cfg[0]](cfg[1])));
    });
  } else {
    console.error('No config provided.');
    process.exit(1);
  }

  // Checking if input option provided and if file is readable.
  if (argvArr.includes('-i')) {
    ioObj.read = await new Promise((resolve) => {
      try {
        fs.accessSync(argvArr[argvArr.indexOf('-i') + 1]);
        resolve(fs.createReadStream(argvArr[argvArr.indexOf('-i') + 1]));
      } catch (err) {
        console.error(`Can't read file at "${argvArr[argvArr.indexOf('-i') + 1]}": [${err.message}].`);
        process.exit(1);
      }
    });
  } else {
    console.error('No path to file provided to read from, reading from stdin...');
    ioObj.read = process.stdin;
  }

  // Checking if output option is provided and writable file exists at provided path.
  if (argvArr.includes('-o')) {
    ioObj.write = await new Promise((resolve) => {
      fs.access(argvArr[argvArr.indexOf('-o') + 1], (err) => {
        if (err) {
          console.error(`Can't write to "${argvArr[argvArr.indexOf('-o') + 1]}", check if such file exists.`);
          process.exit(1);
        } else {
          resolve(fs.createWriteStream(argvArr[argvArr.indexOf('-o') + 1], { flags: 'a+' }));
        }
      });
    });
  } else {
    console.error('No path to file provided to write to, writing to stdout...');
    ioObj.write = process.stdout;
  }
  return ioObj;
}

parseArgv(process.argv).then((arg) => {
  pipeline(arg.read, ...arg.transformArr, arg.write, (err) => {
    if (err) {
      console.error(err.message);
    } else console.log('Beep!');
  });
});

