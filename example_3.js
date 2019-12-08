const reverseStr = require('./reverse').reverseStr;

const { Transform } = require('stream');

const reverseTransformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(reverseStr(chunk.toString()));
    callback();
  }
});

process.stdin.pipe(reverseTransformStream).pipe(process.stdout);