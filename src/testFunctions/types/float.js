const { NUMBER } = require('../primitives');

const float = {
  ...NUMBER,
  type: val => Number(val) === val && val % 1 !== 0,
};
module.exports = float;
