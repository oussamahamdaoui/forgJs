const CUSTOM = (val, f, obj) => f(val, obj);

const TEST_FUNCTIONS = {
  int: {
    min: (val, min) => val - min > 0,
    max: (val, max) => val - max < 0,
    equal: (val, equal) => val === equal,
    type: val => Number.isInteger(val),
  },

  string: {
    minLength: (val, min) => val.length - min > 0,
    maxLength: (val, max) => val.length - max < 0,
    equal: (val, equal) => val === equal,
    match: (val, regex) => regex.test(val),
    notEmpty: val => val !== '',
    type: val => typeof val === 'string' || val instanceof String,
  },

  date: {
    after: (val, min) => val - min > 0,
    before: (val, max) => val - max < 0,
    between: (val, range) => val - range[0] > 0 && val - range[1] < 0,
    equal: (val, equal) => val - equal === 0,
    type: val => val instanceof Date,
  },

  float: {
    min: (val, min) => val - min > 0,
    max: (val, max) => val - max < 0,
    equal: (val, equal) => val === equal,
    type: val => Number(val) === val && val % 1 !== 0,
  },

  array: {
    of: (arr, rule) => {
      let ret = true;
      arr.forEach((el) => {
        if (rule.test(el) === false) {
          ret = false;
        }
      });
      return ret;
    },
    notEmpty: val => val.length !== 0,
    length: (val, len) => val.length === len,
    type: val => val instanceof Array,
  },
};

Object.keys(TEST_FUNCTIONS).forEach((key) => {
  TEST_FUNCTIONS[key].custom = CUSTOM;
});

module.exports = { TEST_FUNCTIONS };
