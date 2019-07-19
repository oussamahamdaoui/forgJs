/**
 * These are the basic validation functions that are common to multiple types
 */

const {
  isString,
} = require('../util');

/**
 * This object combines all  validation functions related to numbers
 */

const NUMBER = {
  min: (val, min) => val - min >= 0,
  max: (val, max) => val - max <= 0,
  equal: (val, equal) => val === equal,
  type: val => Number(val) === val,
};

/**
 * This object combines all  validation functions related to strings
 */
const STRING = {
  minLength: (val, min) => val.length - min >= 0,
  maxLength: (val, max) => val.length - max <= 0,
  equal: (val, equal) => val === equal,
  match: (val, regex) => regex.test(val),
  notEmpty: val => val !== '',
  type: isString,
};

/**
 * This object combines all  validation functions related to booleans
 */

const BOOLEAN = {
  type: val => val === true || val === false,
  toBe: (val, bool) => val === bool,
};

module.exports = {
  BOOLEAN,
  STRING,
  NUMBER,
};
