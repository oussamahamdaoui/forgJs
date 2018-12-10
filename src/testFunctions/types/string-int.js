const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const int = require('./int');


module.exports = mergeRule(STRING, int, val => Number(val));
