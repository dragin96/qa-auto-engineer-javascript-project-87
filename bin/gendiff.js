import { Command } from 'commander';
import path from 'path';
import fs from 'fs';
const program = new Command();

program
    .name("gendiff")
    .description('Compares two configuration files and shows a difference.')
    .version('0.0.1');

program
    .arguments('<filepath1> <filepath2>')
    .option('--format <type>', 'output format')
    .action((filepath1, filepath2, options ) => {
        const optionsFormat = options.format || 'json';
        const fullPathFile1 = path.resolve(process.cwd(), filepath1);
        const fullPathFile2 = path.resolve(process.cwd(), filepath2);
        const jsonFile1 = fs.readFileSync(fullPathFile1, 'utf-8');
        const jsonFile2 = fs.readFileSync(fullPathFile2, 'utf-8');
        const obj1 = JSON.parse(jsonFile1);
        const obj2 = JSON.parse(jsonFile2);
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        const allKeys = new Set([...keys1, ...keys2]);
        const diff = Array.from(allKeys).sort().reduce((acc, key) => {
            if (keys1.includes(key) && keys2.includes(key)) {
                if (obj1[key] === obj2[key]) {
                    return acc + `\n    ${key}: ${obj1[key]}`;
                } else {
                    return acc + `\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
                }
            } else if (keys1.includes(key)) {
                return acc + `\n  - ${key}: ${obj1[key]}`;
            } else {
                return acc + `\n  + ${key}: ${obj2[key]}`;
            }
        }, '{') + '\n}';
        console.log(diff);
    });

program.parse();