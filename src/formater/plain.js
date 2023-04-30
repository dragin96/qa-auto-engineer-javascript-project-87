export const plain = (tree) => {
  return tree.map((acc, el) => {
    if (el.type === 'added') {
      acc = [...acc, `Property '${el.key}' was added with value: ${el.value}`];
    }
    if (el.type === 'deleted') {
      acc = [...acc, `Property '${el.key}' was removed`];
    }
    if (el.type === 'changed') {
      acc = [...acc, `Property '${el.key}' was updated. From ${el.oldValue} to ${el.value}`];
    }
    if (el.type === 'unchanged') {
      return acc;
    }
    return acc;
  }, '').join('\n');
}
