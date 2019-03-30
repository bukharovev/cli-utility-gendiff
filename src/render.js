import _ from 'lodash';

const indentSize = depth => ' '.repeat(depth * 2);

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return value;
  }
  const result = _.keys(value).map(key => `${indentSize(depth + 2)}${key}: ${value[key]}`);
  return ['{', ...result, `${indentSize(depth)}}`].join('\n');
};

const propertyActionTypes = [
  {
    check: arg => arg === 'added',
    process: ((depth, key, oldValue, newValue) => `${indentSize(depth + 1)}+ ${key}: ${stringify(newValue, depth + 2)}`),
  },
  {
    check: arg => arg === 'unchanged',
    process: ((depth, key, oldValue) => `${indentSize(depth + 1)}  ${key}: ${stringify(oldValue, depth + 2)}`),
  },
  {
    check: arg => arg === 'deleted',
    process: ((depth, key, oldValue) => `${indentSize(depth + 1)}- ${key}: ${stringify(oldValue, depth + 2)}`),
  },
  {
    check: arg => arg === 'changed',
    process: ((depth, key, oldValue, newValue) => `${indentSize(depth + 1)}- ${key}: ${stringify(oldValue, depth + 2)}
${indentSize(depth + 1)}+ ${key}: ${stringify(newValue, depth + 2)}`),
  },
  {
    check: arg => arg === 'nested',
    process: ((depth, key, oldValue, newValue, children, render) => `${indentSize(depth + 2)}${key}: {\n${render(children, depth + 2)}\n${indentSize(depth + 2)}}`),
  },
];

const getPropertyActionType = arg => propertyActionTypes.find(({ check }) => check(arg.type));

const render = (ast, depth = 0) => {
  const result = ast.map((obj) => {
    const {
      key,
      oldValue,
      newValue,
      children,
    } = obj;
    const { process } = getPropertyActionType(obj);
    return process(depth, key, oldValue, newValue, children, render);
  });
  const output = result.join('\n');
  return output;
};

export default ast => `{\n${render(ast, 0)}\n}`;
