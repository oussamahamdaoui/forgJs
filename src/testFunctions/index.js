const CUSTOM = (val, f, obj) => f(val, obj);
const OPTIONAL = (val, state) => val === undefined && state === true;

const NUMBER = {
  min: (val, min) => val - min > 0,
  max: (val, max) => val - max < 0,
  equal: (val, equal) => val === equal,
  type: val => Number(val) === val,
};

const STRING = {
  minLength: (val, min) => val.length - min > 0,
  maxLength: (val, max) => val.length - max < 0,
  equal: (val, equal) => val === equal,
  match: (val, regex) => regex.test(val),
  notEmpty: val => val !== '',
  type: val => typeof val === 'string' || val instanceof String,
};

const TEST_FUNCTIONS = {
  int: {
    ...NUMBER,
    type: val => Number.isInteger(val),
  },

  float: {
    ...NUMBER,
    type: val => Number(val) === val && val % 1 !== 0,
  },

  number: {
    ...NUMBER,
  },

  string: {
    ...STRING,
  },

  password: {
    ...STRING,
    numbers: (val, number) => val.match(/(\d)/g) && val.match(/(\d)/g).length >= number,
    uppercase: (val, number) => val.match(/([A-Z])/g) && val.match(/([A-Z])/g).length >= number,
    specialChars: (val, number) => val.match(/([^a-zA-Z])/g) && val.match(/([^a-zA-Z])/g).length >= number,
    matcesOnOf: (val, array) => true,
    matchesAllOf: (val, arr) => true,
  },

  date: {
    after: (val, min) => val - min > 0,
    before: (val, max) => val - max < 0,
    between: (val, range) => val - range[0] > 0 && val - range[1] < 0,
    equal: (val, equal) => val - equal === 0,
    type: val => val instanceof Date,
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

  function: {
    type: val => val && {}.toString.call(val) === '[object Function]',
    result: (val, obj) => obj.toBe.test(val(obj.of)),
  },
};

Object.keys(TEST_FUNCTIONS).forEach((key) => {
  TEST_FUNCTIONS[key].custom = CUSTOM;
  TEST_FUNCTIONS[key].optional = OPTIONAL;
});

module.exports = { TEST_FUNCTIONS, OPTIONAL };
