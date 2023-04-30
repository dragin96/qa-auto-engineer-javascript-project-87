import fs from 'fs';
import { getFormat, getFullPath } from './untils/path.js';
import { parser } from './untils/parsers.js';
import { getFormaterData } from './formater/index.js';
import { getDataChange } from './dataChange.js';

export default (filepath1, filepath2, formatName) => {
  const fullPathFile1 = getFullPath(filepath1);
  const fullPathFile2 = getFullPath(filepath2);
  const jsonFile1 = fs.readFileSync(fullPathFile1, 'utf-8');
  const jsonFile2 = fs.readFileSync(fullPathFile2, 'utf-8');
  const parserFile1 = parser(jsonFile1, getFormat(fullPathFile1));
  const parserFile2 = parser(jsonFile2, getFormat(fullPathFile2));
  const dataChange = getDataChange(parserFile1, parserFile2);
  return getFormaterData(dataChange, formatName);
};
