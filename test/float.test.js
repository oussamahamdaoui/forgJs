const { Rule } = require('../src');

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
