const { Rule } = require('../../src');

test('type float returns true when float', () => {
  const floatRule = new Rule({
    type: 'float',
  }, null);
  expect(floatRule.test(2.001)).toBe(true);
});

test('type float returns false when int', () => {
  const floatRule = new Rule({
    type: 'float',
  }, null);
  expect(floatRule.test(2)).toBe(false);
});

test('type float returns true when bigger than 100', () => {
  const floatRule = new Rule({
    type: 'float',
    min: 100,
  }, null);
  expect(floatRule.test(100.3)).toBe(true);
});

test('type float returns true when smaller than 100', () => {
  const floatRule = new Rule({
    type: 'float',
    max: 100,
  }, null);
  expect(floatRule.test(99.3)).toBe(true);
});

test('type float returns true when two floats are equal', () => {
  const floatRule = new Rule({
    type: 'float',
    equal: 100.1,
  }, null);
  expect(floatRule.test(100.1)).toBe(true);
});

test('type float returns true when is one of array', () => {
  const floatRule = new Rule({
    type: 'float',
    oneOf: [3.5, 100.1, 7.2, 0.1],
  }, null);
  expect(floatRule.test(100.1)).toBe(true);
});

test('type float returns false when is not one of array', () => {
  const floatRule = new Rule({
    type: 'float',
    oneOf: [100.01, 7.2, 0.1],
  }, null);
  expect(floatRule.test(100.1)).toBe(false);
});
