import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parser from './parsers';

const propertyTypes = [
  {
    check: ((obj1, obj2, key) => _.has(obj1, key) && _.has(obj2, key) && obj1[key] !== obj2[key]),
    process: ((obj1, obj2, key) => `  + ${key}: ${obj2[key]}
  - ${key}: ${obj1[key]}`),
  },
  {
    check: ((obj1, obj2, key) => _.isEqual(obj1[key], obj2[key])),
    process: ((obj1, obj2, key) => `    ${key}: ${obj1[key]}`),
  },
  {
    check: ((obj1, obj2, key) => _.isUndefined(obj1[key])),
    process: ((obj1, obj2, key) => `  + ${key}: ${obj2[key]}`),
  },
  {
    check: ((obj1, obj2, key) => _.isUndefined(obj2[key])),
    process: ((obj1, obj2, key) => `  - ${key}: ${obj1[key]}`),
  },
];

const getPropertyTypes = (obj1, obj2, key) => (
  propertyTypes.find(({ check }) => check(obj1, obj2, key)));

const genDiff = (pathFile1, pathFile2) => {
  const dataFile1 = fs.readFileSync(pathFile1, 'utf-8');
  const dataFile2 = fs.readFileSync(pathFile2, 'utf-8');

  const formatFile1 = path.extname(pathFile1).substr(1);
  const formatFile2 = path.extname(pathFile2).substr(1);

  const obj1 = parser(dataFile1, formatFile1);
  const obj2 = parser(dataFile2, formatFile2);

  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.map((key) => {
    const { process } = getPropertyTypes(obj1, obj2, key);
    return process(obj1, obj2, key);
  });
  const output = `{\n${result.join('\n')}\n}`;
  return output;
};

export default genDiff;
