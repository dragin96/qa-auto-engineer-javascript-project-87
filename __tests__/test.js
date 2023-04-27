import { diff } from '../src/diff.js';

describe('diff', () => {
  test('should return an empty object string for identical JSON files', () => {
    const jsonFile1 = '{"a":1,"b":2,"c":3}';
    const jsonFile2 = '{"a":1,"b":2,"c":3}';
    const expectedResult = '{\n    a: 1\n    b: 2\n    c: 3\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });

  test('should return the differences between two JSON files', () => {
    const jsonFile1 = '{"a":1,"b":2,"c":3}';
    const jsonFile2 = '{"a":1,"b":4,"c":3,"d":5}';
    const expectedResult = '{\n    a: 1\n  - b: 2\n  + b: 4\n    c: 3\n  + d: 5\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });

  test('should handle missing keys in the first JSON file', () => {
    const jsonFile1 = '{"a":1,"c":3}';
    const jsonFile2 = '{"a":1,"b":2,"c":3}';
    const expectedResult = '{\n    a: 1\n  + b: 2\n    c: 3\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });

  test('should handle missing keys in the second JSON file', () => {
    const jsonFile1 = '{"a":1,"b":2,"c":3}';
    const jsonFile2 = '{"a":1,"c":3}';
    const expectedResult = '{\n    a: 1\n  - b: 2\n    c: 3\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });

  test('should handle empty JSON files', () => {
    const jsonFile1 = '{}';
    const jsonFile2 = '{}';
    const expectedResult = '{\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });

  test('should handle non-overlapping JSON files', () => {
    const jsonFile1 = '{"a":1,"b":2}';
    const jsonFile2 = '{"c":3,"d":4}';
    const expectedResult = '{\n  - a: 1\n  - b: 2\n  + c: 3\n  + d: 4\n}';
    expect(diff(jsonFile1, jsonFile2)).toEqual(expectedResult);
  });
});
