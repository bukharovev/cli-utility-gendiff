import fs from 'fs';
import genDiff from '../src';

test('diff JSON', () => {
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  const result = '__tests__/__fixtures__/expectedJSON.txt';
  expect(genDiff(before, after)).toBe(result);
});

