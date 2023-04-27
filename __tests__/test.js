import { parser } from '../src/parsers.js';
import { jsonDiff } from '../src/diff.js';

describe('parser', () => {
  const formats = [
    { format: 'json', data: '{"a":1,"b":2,"c":3}' },
    { format: 'yaml', data: 'a: 1\nb: 2\nc: 3' },
    { format: 'yml', data: 'a: 1\nb: 2\nc: 3' },
  ];

  const parsedData = { a: 1, b: 2, c: 3 };

  formats.forEach(({ format, data }) => {
    test(`should parse ${format.toUpperCase()} data`, () => {
      expect(parser(data, format)).toEqual(parsedData);
    });
  });

  test('should throw an error for unknown format', () => {
    const unknownData = 'a: 1\nb: 2\nc: 3';
    const unknownFormat = 'unknown';
    expect(() => parser(unknownData, unknownFormat)).toThrowError(`Unknown format: ${unknownFormat}`);
  });
});

describe('jsonDiff', () => {
  const testCases = [
    {
      name: 'should return an empty object string for identical objects',
      obj1: { a: 1, b: 2, c: 3 },
      obj2: { a: 1, b: 2, c: 3 },
      expectedResult: '{\n    a: 1\n    b: 2\n    c: 3\n}',
    },
    {
      name: 'should return the differences between two objects',
      obj1: { a: 1, b: 2, c: 3 },
      obj2: { a: 1, b: 4, c: 3, d: 5 },
      expectedResult: '{\n    a: 1\n  - b: 2\n  + b: 4\n    c: 3\n  + d: 5\n}',
    },
    {
      name: 'should handle missing keys in the first object',
      obj1: { a: 1, c: 3 },
      obj2: { a: 1, b: 2, c: 3 },
      expectedResult: '{\n    a: 1\n  + b: 2\n    c: 3\n}',
    },
    {
      name: 'should handle missing keys in the second object',
      obj1: { a: 1, b: 2, c: 3 },
      obj2: { a: 1, c: 3 },
      expectedResult: '{\n    a: 1\n  - b: 2\n    c: 3\n}',
    },
    {
      name: 'should handle empty objects',
      obj1: {},
      obj2: {},
      expectedResult: '{\n}',
    },
    {
      name: 'should handle non-overlapping objects',
      obj1: { a: 1, b: 2 },
      obj2: { c: 3, d: 4 },
      expectedResult: '{\n  - a: 1\n  - b: 2\n  + c: 3\n  + d: 4\n}',
    },
  ];

  testCases.forEach(({ name, obj1, obj2, expectedResult }) => {
    test(name, () => {
      expect(jsonDiff(obj1, obj2)).toEqual(expectedResult);
    });
  });
});

