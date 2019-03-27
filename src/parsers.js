import yaml from 'js-yaml';

const fileFormats = {
  json: JSON.parse,
  yaml: yaml.safeLoad,
};

export default (data, format) => fileFormats[format](data);
