import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
import { diff } from '../src/diff.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1');

program
  .arguments('<filepath1> <filepath2>')
  .option('--format <type>', 'output format')
  .action((filepath1, filepath2, options) => {
    const fullPathFile1 = path.resolve(process.cwd(), filepath1);
    const fullPathFile2 = path.resolve(process.cwd(), filepath2);
    const jsonFile1 = fs.readFileSync(fullPathFile1, 'utf-8');
    const jsonFile2 = fs.readFileSync(fullPathFile2, 'utf-8');
    const result = diff(jsonFile1, jsonFile2);
    console.log(result);
  });

program.parse();
