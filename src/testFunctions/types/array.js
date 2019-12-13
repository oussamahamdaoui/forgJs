const { isArray } = require('../../util');

const array = {
  of: (arr, rule) => {
    let ret = true;
    arr.forEach((el) => {
      if (rule.test(el) === false) {
        ret = false;
      }
    });
    return ret;
  },
  notEmpty: (val, itShouldNotBeEmpty) => (val.length !== 0) === itShouldNotBeEmpty,
  isEmpty: (val, itShouldBeEmpty) => (val.length === 0) === itShouldBeEmpty,
  length: (val, len) => val.length === len,
  type: isArray,
};

module.exports = array;
