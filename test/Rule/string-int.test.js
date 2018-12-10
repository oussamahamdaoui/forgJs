const { Rule } = require('../../src');

test('type test not number is false', () => {
  const numberRule = new Rule({
    type: 'string-int',
  }, null);

  expect(numberRule.test([])).toBe(false);
});

test('type test int number is false', () => {
  const numberRule = new Rule({
    type: 'string-int',
  }, null);

  expect(numberRule.test(2)).toBe(false);
});

test('type test int number is true', () => {
  const numberRule = new Rule({
    type: 'string-int',
  }, null);

  expect(numberRule.test('2')).toBe(true);
});


test('type test max string-number is true', () => {
  const numberRule = new Rule({
    type: 'string-int',
    max: 5,
  }, null);

  expect(numberRule.test('2')).toBe(true);
});

test('type test max string-number is false', () => {
  const numberRule = new Rule({
    type: 'string-int',
    max: 5,
  }, null);

  expect(numberRule.test('7')).toBe(false);
});


test('type test min string-number is false', () => {
  const numberRule = new Rule({
    type: 'string-int',
    min: 5,
  }, null);

  expect(numberRule.test('2')).toBe(false);
});

test('type test min string-number is true', () => {
  const numberRule = new Rule({
    type: 'string-int',
    min: 5,
  }, null);

  expect(numberRule.test('7')).toBe(true);
});


test('type test string-number is equal to 5', () => {
  const numberRule = new Rule({
    type: 'string-int',
    equal: 5,
  }, null);

  expect(numberRule.test('5')).toBe(true);
});


test('type test string-number is not equal to 5', () => {
  const numberRule = new Rule({
    type: 'string-int',
    equal: 5,
  }, null);

  expect(numberRule.test('7')).toBe(false);
});
