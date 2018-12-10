const { STRING } = require('../primitives');
const { isString, URL_REGEX } = require('../../util');


const url = {
  ...STRING,
  type: val => isString(val) && URL_REGEX.test(val),
  domain: (val, f) => f(val.match(URL_REGEX)[3]),
  protocol: (val, f) => f(val.match(URL_REGEX)[1]),
};

module.exports = url;
