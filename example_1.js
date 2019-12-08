
const reverseStr = require('./reverse').reverseStr;

const stdInStream = process.stdin;
const stdOutStream = process.stdout;

stdInStream.setEncoding('utf8');

stdInStream.on('readable', () => {
  const chunk = stdInStream.read();
  if (chunk !== null) {
    stdOutStream.write(reverseStr(chunk));
  }
});

