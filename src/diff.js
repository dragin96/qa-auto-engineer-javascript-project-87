export function diff(jsonFile1, jsonFile2) {
  const obj1 = JSON.parse(jsonFile1);
  const obj2 = JSON.parse(jsonFile2);
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = new Set([...keys1, ...keys2]);
  return `${Array.from(allKeys).sort().reduce((acc, key) => {
    if (keys1.includes(key) && keys2.includes(key)) {
      if (obj1[key] === obj2[key]) {
        return `${acc}\n    ${key}: ${obj1[key]}`;
      }
      return `${acc}\n  - ${key}: ${obj1[key]}\n  + ${key}: ${obj2[key]}`;
    } if (keys1.includes(key)) {
      return `${acc}\n  - ${key}: ${obj1[key]}`;
    }
    return `${acc}\n  + ${key}: ${obj2[key]}`;
  }, '{')}\n}`;
}
