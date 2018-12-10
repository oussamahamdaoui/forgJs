const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const date = require('./date');


module.exports = mergeRule(STRING, date, val => new Date(val));
