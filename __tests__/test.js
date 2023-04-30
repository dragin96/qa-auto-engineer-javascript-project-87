import getDataChange from '../src/dataChange.js';

describe('getDataChange', () => {
  test('returns empty array if both objects are empty', () => {
    const obj1 = {};
    const obj2 = {};
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([]);
  });

  test('returns array with "added" type for new property', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1, b: 2 };
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([
      { key: 'a', type: 'unchanged', value: 1 },
      { key: 'b', type: 'added', value: 2 },
    ]);
  });

  test('returns array with "deleted" type for removed property', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1 };
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([
      { key: 'a', type: 'unchanged', value: 1 },
      { key: 'b', type: 'deleted', value: 2 },
    ]);
  });

  test('returns array with "changed" type for changed property', () => {
    const obj1 = { a: 1, b: 2 };
    const obj2 = { a: 1, b: 3 };
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([
      { key: 'a', type: 'unchanged', value: 1 },
      {
        key: 'b', type: 'changed', oldValue: 2, value: 3,
      },
    ]);
  });

  test('returns array with "nested" type for nested objects', () => {
    const obj1 = { a: { b: 1 } };
    const obj2 = { a: { b: 2 } };
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([{
      key: 'a',
      type: 'nested',
      children: [{
        key: 'b', type: 'changed', oldValue: 1, value: 2,
      }],
    }]);
  });

  test('returns array with "unchanged" type for unchanged property', () => {
    const obj1 = { a: 1 };
    const obj2 = { a: 1 };
    const result = getDataChange(obj1, obj2);
    expect(result).toEqual([{ key: 'a', type: 'unchanged', value: 1 }]);
  });
});
