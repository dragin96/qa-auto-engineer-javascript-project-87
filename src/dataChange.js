export const getDataChange = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const allKeys = new Set([...keys1, ...keys2]);
  const sortedKeys = Array.from(allKeys).sort();
  return sortedKeys.map((key) => {
    if(!obj1.hasOwnProperty(key)){
      return {key: key, value: obj2[key], type: 'added'};
    }
    if(!obj2.hasOwnProperty(key)){
      return {key: key, value: obj1[key], type: 'deleted'};
    }
    if(obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] === obj2[key]){
      return {key: key, value: obj1[key], type: 'unchanged'};
    }
    if(obj1.hasOwnProperty(key) && obj2.hasOwnProperty(key) && obj1[key] !== obj2[key]){
      return {key: key, value: obj2[key], oldValue: obj1[key], type: 'changed'};
    }
  });
}
