const date = {
  after: (val, min) => val - min > 0,
  before: (val, max) => val - max < 0,
  between: (val, range) => val - range[0] > 0 && val - range[1] < 0,
  equal: (val, equal) => val - equal === 0,
  type: val => val instanceof Date,
};

module.exports = date;
