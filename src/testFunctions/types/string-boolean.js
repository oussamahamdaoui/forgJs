const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const boolean = require('./boolean');

const castBoolean = (val) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return 'a';
};

module.exports = mergeRule(STRING, boolean, castBoolean);
