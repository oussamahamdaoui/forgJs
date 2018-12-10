const {
  isString,
} = require('../util');

const NUMBER = {
  min: (val, min) => val - min >= 0,
  max: (val, max) => val - max <= 0,
  equal: (val, equal) => val === equal,
  type: val => Number(val) === val,
};

const STRING = {
  minLength: (val, min) => val.length - min >= 0,
  maxLength: (val, max) => val.length - max <= 0,
  equal: (val, equal) => val === equal,
  match: (val, regex) => regex.test(val),
  notEmpty: val => val !== '',
  type: isString,
};

const BOOLEAN = {
  type: val => val === true || val === false,
  toBe: (val, bool) => val === bool,
};

module.exports = {
  BOOLEAN,
  STRING,
  NUMBER,
};
