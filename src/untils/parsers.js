import YAML from 'yaml';

const objParsers = {
  json: JSON.parse,
  yml: YAML.parse,
  yaml: YAML.parse,
};

export const parser = (data, format) => {
  if (!objParsers[format]) {
    throw new Error(`Unknown format: ${format}`);
  }
  return objParsers[format](data);
};
