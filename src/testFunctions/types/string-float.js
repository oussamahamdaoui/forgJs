const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const float = require('./float');


module.exports = mergeRule(STRING, float, val => Number(val));
