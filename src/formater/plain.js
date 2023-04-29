export const plain = (tree) => {
  return tree.reduce((acc, el) => {
    if (el.type === 'added') {
      acc += `Property '${el.key}' was added with value: ${el.value}\n`;
    }
    if (el.type === 'deleted') {
      acc += `Property '${el.key}' was removed\n`;
    }
    if (el.type === 'changed') {
      acc += `Property '${el.key}' was updated. From ${el.oldValue} to ${el.value}\n`;
    }
    if (el.type === 'unchanged') {
      acc += '';
    }
    return acc;
  }, '');
}
