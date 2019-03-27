import fs from 'fs';
import genDiff from '../src';

const formatsFile = ['json', 'yaml', 'ini'];
test.each(formatsFile)('%s diff', (format) => {
  const before = `__tests__/__fixtures__/before.${format}`;
  const after = `__tests__/__fixtures__/after.${format}`;
  const result = fs.readFileSync('__tests__/__fixtures__/expected.txt', 'utf-8');
  expect(genDiff(before, after)).toBe(result);
});
