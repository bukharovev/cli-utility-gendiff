#!/usr/bin/env node

/**
 * Module dependencies.
 */

import program from 'commander';

program
  .version('0.1.0')
  .description('Compares two configuration files and shows a difference.')
  .option('-h, --help', 'output usage information')
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);