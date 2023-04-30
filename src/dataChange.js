export default (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = new Set([...keys1, ...keys2]);
  const sortedKeys = [...allKeys].sort();
  return sortedKeys.map((key) => {
    if (!keys1.includes(key) && keys2.includes(key)) {
      return {
        key,
        type: 'added',
        value: obj2[key],
      };
    }
    if (keys1.includes(key) && !keys2.includes(key)) {
      return {
        key,
        type: 'deleted',
        value: obj1[key],
      };
    }
    if (obj1[key] !== obj2[key]) {
      return {
        key,
        type: 'changed',
        oldValue: obj1[key],
        value: obj2[key],
      };
    }
    return {
      key,
      type: 'unchanged',
      value: obj1[key],
    };
  });
};
