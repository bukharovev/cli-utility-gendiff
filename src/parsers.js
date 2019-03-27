import yaml from 'js-yaml';
import ini from 'ini';

const fileFormats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
  ini: ini.parse,
};

export default (dataFile, formatFile) => fileFormats[formatFile](dataFile);
