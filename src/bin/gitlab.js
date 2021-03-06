#!/usr/bin/env node
import yargs from 'yargs';
// import path from 'path';
// import chalk from 'chalk';
// import tildify from 'tildify';
import pkg from './../../package.json';
import GitLabTools from './../../lib';
import Promise from 'bluebird';
import {mapKeys, camelCase} from 'lodash';
import inquirer from 'inquirer'; Promise.promisifyAll(inquirer);
import log from './../utils/log';

const argv = yargs
  .usage('Usage: $0 <command> [options]')
  .demand(1)
  .option('dialect', {description: 'Database dialect', type: 'string'}).default('dialect', GitLabTools.defaults.dialect)
  .option('username', {description: 'Database username', type: 'string'}).default('username', GitLabTools.defaults.username)
  .option('password', {description: 'Database password', type: 'string'}).default('password', GitLabTools.defaults.password)
  .option('database', {description: 'Database name', type: 'string'}).default('database', GitLabTools.defaults.database)
  .command('clone-labels', 'Clone labels between projects', () => {
    yargs
      .usage('Usage: $0 clone-labels <project_id>')
      .demand(3, 'Error: clone-labels must have a file base as the first argument.')
      .option('global', {description: 'Use global labels', type: 'boolean'}).alias('global', 'g')
      .option('truncate', {description: 'Truncate existing labels', type: 'boolean'}).alias('truncate', 't')
      .help('h').alias('h', 'help');
  })
  .help('h').alias('h', 'help')
  // .epilog('copyright 2015')
  .version(pkg.version)
  .argv;

const tools = new GitLabTools(mapKeys(argv, (value, key) => camelCase(key)));
const cmds = argv._.slice(1);
switch (argv._[0]) {
  case 'clone-labels':
    tools.cloneLabels(...cmds)
    .catch({code: 'EEXIST'}, err => {
      log.warn('You are about to remove the EASYRSA_PKI at: %s and initialize a fresh PKI here.');
    })
    .then(() => {
      log.info('init-pki complete; you may now create a CA or requests.');
      process.exit(0);
    });
    break;
  default:
}

// function prettyPath(filepPath) {
//   return chalk.magenta(tildify(filepPath));
// }
