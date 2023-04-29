export const stylishFormater = (tree) => {
    const getValueDiff = (node, sign) => {
      const tab = '  ';
      return `${tab}${sign} ${node.key}: ${node.value}\n`;
    }
    return tree.reduce((acc, el) => {
      if(el.type === 'added') {
        acc += getValueDiff(el, '+');
      }
      if(el.type === 'deleted') {
        acc +=  getValueDiff(el, '-');
      }
      if(el.type === 'changed') {
        const oldValue = getValueDiff(el, '-');
        const newValue = getValueDiff(el, '+');
        acc +=  `${oldValue}${newValue}`;
      }
      if(el.type === 'unchanged') {
        acc +=  getValueDiff(el, '');
      }
      return acc;
    }, '{\n') + '}';
}
