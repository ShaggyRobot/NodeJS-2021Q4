const fs = require('fs');
const { MyRead } = require('./myRead');
const { Caesar } = require('./Ciphers/caesar');
const { Rot8 } = require('./Ciphers/rot-8');
const { Atbash } = require('./Ciphers/atbash');
const { pipeline } = require('stream');
const {MyWrite} = require('./myWrite')
const process = require('process');

const ciphers = {
  C: (a) => new Caesar(a),
  R: (a) => new Rot8(a),
  A: (a) => new Atbash(a)
};

async function parseArgv(argv) {
  const ioObj = new Object();
  const argvArr = argv.slice(2);
  let inputArg = '';
  let outputArg = '';
  let configArg = '';

  // Assigning options, checking for duplicate options
  for (const arg of argvArr) {
    switch (arg) {
      case '--input':
      case '-i':
        if (inputArg != '') {
          console.error('Duplicate input argument.');
          process.exit(1);
        } else {
          inputArg = arg;
          break;
        }

      case '--output':
      case '-o':
        if (outputArg != '') {
          console.error('Duplicate output argument.');
          process.exit(1);
        } else {
          outputArg = arg;
          break;
        }

      case '--config':
      case '-c':
        if (configArg != '') {
          console.error('Duplicate config argument.');
          process.exit(1);
        } else {
          configArg = arg;
          break;
        }
    }
  }

  // Validating config
  if (configArg && argvArr.slice(-1) != configArg) {
    for (const arg of argvArr[argvArr.indexOf(configArg) + 1].split('-')) {
      if (!Object.keys(ciphers).includes(arg[0])) {
        console.error(
          arg[0] ? `Invalid option "${arg}" in config. Only "C", "R" or "A" expected.` : 'Empty option in config, expected "C", "R" or "A".'
        );
        process.exit(1);
      }
    }
    // Populating transforms array
    ioObj.transformArr = await new Promise((resolve) => {
      resolve(argvArr[argvArr.indexOf(configArg) + 1].split('-').map((cfg) => ciphers[cfg[0]](cfg[1])));
    });
  } else {
    console.error('No config provided.');
    process.exit(1);
  }

  // Checking if input option provided and if file is readable.
  if (inputArg) {
    ioObj.read = await new Promise((resolve) => {
      try {
        fs.accessSync(argvArr[argvArr.indexOf(inputArg) + 1]);
        resolve(new MyRead(argvArr[argvArr.indexOf(inputArg) + 1]));
      } catch (err) {
        console.error(`Can't read file at "${argvArr[argvArr.indexOf(inputArg) + 1]}": [${err.message}].`);
        process.exit(1);
      }
    });
  } else {
    console.error('No path to file provided to read from, reading from stdin...');
    ioObj.read = process.stdin;
  }

  // Checking if output option is provided and writable file exists at provided path.
  if (outputArg) {
    ioObj.write = await new Promise((resolve) => {
      fs.access(argvArr[argvArr.indexOf(outputArg) + 1], (err) => {
        if (err) {
          console.error(`Can't write to "${argvArr[argvArr.indexOf(outputArg) + 1]}", check if such file exists.`);
          process.exit(1);
        } else {
          resolve(new MyWrite(argvArr[argvArr.indexOf(outputArg) + 1], { flags: 'a+' }));
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
