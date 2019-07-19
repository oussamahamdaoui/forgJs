/**
 * This file contains all validation functions that are present in all the types
 */

const { looseEqual } = require('../util');
const types = require('./types');

/**
 * The custom validation function
 * @param {*} val
 * @param {*} f
 * @param {*} obj
 */

const CUSTOM = (val, f, obj) => f(val, obj);

/**
 * The optional validation function
 * @param  val the value to be tested
 * @param {boolean} state is the value optional
 */
const OPTIONAL = (val, state) => val === undefined && state === true;

/**
 * This function validates that a value is part of an array
 * @param val the value
 * @param {Array} arr the array of alowed values
 */
const oneOf = (val, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (looseEqual(arr[i], val)) {
      return true;
    }
  }
  return false;
};

const TEST_FUNCTIONS = {
  ...types,
};
Object.keys(TEST_FUNCTIONS).forEach((key) => {
  TEST_FUNCTIONS[key].custom = CUSTOM;
  TEST_FUNCTIONS[key].optional = OPTIONAL;
  TEST_FUNCTIONS[key].oneOf = oneOf;
});

module.exports = { TEST_FUNCTIONS, OPTIONAL };
