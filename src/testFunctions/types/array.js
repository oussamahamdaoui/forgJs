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
  notEmpty: val => val.length !== 0,
  length: (val, len) => val.length === len,
  type: isArray,
};

module.exports = array;
