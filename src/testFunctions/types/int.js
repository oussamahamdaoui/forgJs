const { NUMBER } = require('../primitives');
const { isInt } = require('../../util');

const int = {
  ...NUMBER,
  type: isInt,
};
module.exports = int;
