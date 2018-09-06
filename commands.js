#!/usr/bin/env node
const program = require('commander');
const http = require('http');

const {
  urbanDictionary,
  goodbye
} = require('./index');

program
  .version('1.0.0')
  .description('kwaji cli')

program
  .command('urbanDictionary <word>')
  .alias('a')
  .description('word to look up in urban dictionary')
  .action(function(word){
    http.get('http://api.urbandictionary.com/v0/define?term={' + word + '}', (res) => {
  const { statusCode } = res;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error('Request Failed.\n' +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error('Invalid content-type.\n' +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.error(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    try {
      const parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.error(e.message);
    }
  });
}).on('error', (e) => {
  console.error(`Got error: ${e.message}`);
});
  });


program
  .command('goodbye <turtleName>')
  .alias('a')
  .description('turtle name')
  .action((turtleName)=> {
  goodbye(turtleName);
  });

program.parse(process.argv);
