export const plain = (tree) => {
  return tree.reduce((acc, el) => {
    switch (el.type) {
      case 'added':
        return [...acc, `Property '${el.key}' was added with value: ${el.value}`];
      case 'deleted':
        return [...acc, `Property '${el.key}' was removed`];
      case 'changed':
        return [...acc, `Property '${el.key}' was updated. From ${el.oldValue} to ${el.value}`];
      case 'unchanged':
        return acc;
      case 'nested':
        return [...acc, plain(el.children)];
    }
  }, []).join('\n');
}
