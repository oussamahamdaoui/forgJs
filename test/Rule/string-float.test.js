const { Rule } = require('../../src');

test('type test not number is false', () => {
  const numberRule = new Rule({
    type: 'string-float',
  }, null);

  expect(numberRule.test([])).toBe(false);
});

test('type test float number is false', () => {
  const numberRule = new Rule({
    type: 'string-float',
  }, null);

  expect(numberRule.test(2.01)).toBe(false);
});

test('type test float number is true', () => {
  const numberRule = new Rule({
    type: 'string-float',
  }, null);

  expect(numberRule.test('2.01')).toBe(true);
});


test('type test max string-number is true', () => {
  const numberRule = new Rule({
    type: 'string-float',
    max: 5,
  }, null);

  expect(numberRule.test('2.01')).toBe(true);
});

test('type test max string-number is false', () => {
  const numberRule = new Rule({
    type: 'string-float',
    max: 5,
  }, null);

  expect(numberRule.test('7.1')).toBe(false);
});


test('type test min string-number is false', () => {
  const numberRule = new Rule({
    type: 'string-float',
    min: 5,
  }, null);

  expect(numberRule.test('2.1')).toBe(false);
});

test('type test min string-number is true', () => {
  const numberRule = new Rule({
    type: 'string-float',
    min: 5,
  }, null);

  expect(numberRule.test('7.1')).toBe(true);
});


test('type test string-number is equal to 5', () => {
  const numberRule = new Rule({
    type: 'string-float',
    equal: 5.1,
  }, null);

  expect(numberRule.test('5.1')).toBe(true);
});


test('type test string-number is not equal to 5', () => {
  const numberRule = new Rule({
    type: 'string-float',
    equal: 5,
  }, null);

  expect(numberRule.test('7.1')).toBe(false);
});
