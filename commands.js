#!/usr/bin/env node
const program = require('commander');

const {
  hello,
  goodbye
} = require('./index');

program
  .version('1.0.0')
  .description('kwaji cli')

program
  .command('hello <turtleName>')
  .alias('a')
  .description('turtle name')
  .action(turtleName => hello(turtleName));


program
  .command('goodbye <turtleName>')
  .alias('a')
  .description('turtle name')
  .action((turtleName)=> {
  goodbye(turtleName);
  });

program.parse(process.argv);
