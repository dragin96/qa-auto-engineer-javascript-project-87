export const jsonFormater = (tree) => {
  const json =  tree.reduce((acc, el) => {
    if(el.type === 'added') {
      acc[el.key] = el.value;
      return acc;
    }
    if(el.type === 'deleted') {
      return acc;
    }
    if(el.type === 'changed') {
      acc[el.key] = el.value;
      return acc;
    }
    if(el.type === 'unchanged') {
      acc[el.key] = el.value;
      return acc;
    }
    if(el.type === 'nested') {
      acc[el.key] = jsonFormater(el.children);
      return acc;
    }
  }, {})
  return JSON.stringify(json, null, 2);
}
