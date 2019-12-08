const csv = require('csvtojson');
const fs = require('fs');

import { handleError } from './error-handle.js';

const csvFilePath = './src/csv/node_mentoring_t1_2_input_example.csv';
const txtFilePath = 'csvToJson.txt';

const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream(txtFilePath);
const csvEntity = csv().on('data',(data) => {
                            const jsonStr = data.toString('utf8');
                            writeStream.write(jsonStr);
                          });

readStream.pipe(csvEntity)
          .on('error', function(e) { handleError(e)});
