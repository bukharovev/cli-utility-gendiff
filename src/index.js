import _ from 'lodash';
import fs from 'fs';

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

const genDiff = (path1, path2) => {
  const obj1 = JSON.parse(fs.readFileSync(path1));
  const obj2 = JSON.parse(fs.readFileSync(path2));
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const res = keys.map((key) => {
    const { process } = getPropertyTypes(obj1, obj2, key);
    return process(obj1, obj2, key);
  });
  const result = `{\n${res.join('\n')}\n}`;
  return result;
};


export default genDiff;
