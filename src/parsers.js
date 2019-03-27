import yaml from 'js-yaml';
import ini from 'ini';

const dataTypes = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (dataFile, formatFile) => dataTypes[formatFile](dataFile);
