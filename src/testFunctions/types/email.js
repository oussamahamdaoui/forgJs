const { STRING } = require('../primitives');
const { isString } = require('../../util');

const email = {
  ...STRING,
  type: val => isString(val) && /\S+@\S+\.\S+/.test(val),
  user: (val, f) => f(val.match(/(\S+)@\S+\.\S+/)[1]),
  domain: (val, f) => f(val.match(/\S+@(\S+)\.\S+/)[1]),

};
module.exports = email;
