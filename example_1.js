
const reverseStr = require('./reverse').reverseStr;

const stdInThread = process.stdin;
const stdOutThread = process.stdout;

stdInThread.setEncoding('utf8');

stdInThread.on('readable', () => {
  const chunk = stdInThread.read();
  if (chunk !== null) {
    stdOutThread.write(reverseStr(chunk));
  }
});

