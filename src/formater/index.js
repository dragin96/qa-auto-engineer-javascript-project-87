import { plain } from './plain.js';
import { stylishFormater } from './stylish.js';
import { jsonFormater } from './json.js';

const formater = {
  stylish: stylishFormater,
  plain,
  json: jsonFormater,
};

export const getFormaterData = (tree, format = 'stylish') => {
  if (!formater[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formater[format](tree);
};
