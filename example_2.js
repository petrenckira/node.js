const reverseStr = require('./reverse').reverseStr;

const { Writable } = require('stream');

const revertWriteStream = new Writable({
  write(chunk, encoding, callback) {
    console.log(reverseStr(chunk.toString()));
    callback();
  }
});

process.stdin.pipe(revertWriteStream);
