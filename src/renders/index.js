import renderDefault from './render';
import renderToPlain from './renderToPlain';

export default (ast, format) => {
  if (format === 'plain') {
    return renderToPlain(ast);
  }
  return renderDefault(ast);
};
