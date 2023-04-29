
import { plain } from './plain.js';
import { stylishFormater } from './stylish.js';
import { jsonFormater } from './json.js';

const formater = {
  stylish: stylishFormater,
  plain:  plain,
  json: jsonFormater,
}

export const getFormaterData = (format, tree) => {
  if (!formater[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return formater[format](tree);
}
