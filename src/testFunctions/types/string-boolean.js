const { STRING, BOOLEAN } = require('../primitives');
const { mergeRule } = require('../../util');

const castBoolean = (val) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return 'a';
};

module.exports = mergeRule(STRING, BOOLEAN, castBoolean);
