import fs from 'fs';
import genDiff from '../src';

test('diff JSON', () => {
  const before = '__tests__/__fixtures__/before.json';
  const after = '__tests__/__fixtures__/after.json';
  const result = String(fs.readFileSync('__tests__/__fixtures__/expected.txt'));
  expect(genDiff(before, after)).toBe(result);
});

test('diff YAML', () => {
  const before = '__tests__/__fixtures__/before.yaml';
  const after = '__tests__/__fixtures__/after.yaml';
  const result = String(fs.readFileSync('__tests__/__fixtures__/expected.txt'));
  expect(genDiff(before, after)).toBe(result);
});

test('diff INI', () => {
  const before = '__tests__/__fixtures__/before.ini';
  const after = '__tests__/__fixtures__/after.ini';
  const result = String(fs.readFileSync('__tests__/__fixtures__/expected.txt'));
  expect(genDiff(before, after)).toBe(result);
});
