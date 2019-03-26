import _ from 'lodash';
import fs from 'fs';

const genDiff = (path1, path2) => {
  const obj1 = fs.readFileSync(path1);
  const obj2 = fs.readFileSync(path2);
  const keys = _.union(_.keys(obj1), _.keys(obj2));
  const result = keys.reduce((acc, key) => {
    if (_.isEqual(obj1[key], obj2[key])) {
      acc = [...acc, `${key}: ${obj1[key]}`];
    } else if (_.has(obj1, key) && _.has(obj2, key)) {
      acc = [...acc, `+ ${key}: ${obj2[key]}`];
      acc = [...acc, `- ${key}: ${obj1[key]}`];
    }
    if (_.isUndefined(obj1[key])) {
      acc = [...acc, `+ ${key}: ${obj2[key]}`];
    }
    if (_.isUndefined(obj2[key])) {
      acc = [...acc, `- ${key}: ${obj1[key]}`];
    }
    return acc;
  }, []);
  return result;
};

export default genDiff;
