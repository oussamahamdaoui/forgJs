const { looseEqual } = require('../util');
const types = require('./types');

const CUSTOM = (val, f, obj) => f(val, obj);
const OPTIONAL = (val, state) => val === undefined && state === true;
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
