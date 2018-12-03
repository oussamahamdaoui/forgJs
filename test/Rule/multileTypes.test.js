const { Rule } = require('../../src');

test('returns true if int or float or number', () => {
  const intRule = new Rule({
    type: 'int|float|number',
  }, null);

  expect(intRule.test(1.2)).toBe(true);
});

test('reterns false if not int or float', () => {
  const intRule = new Rule({
    type: 'int|float|number',
  }, null);

  expect(intRule.test([])).toBe(false);
});

test('reterns false if not (int and number)', () => {
  const intRule = new Rule({
    type: 'int&number',
  }, null);

  expect(intRule.test([])).toBe(false);
});

test('reterns true if int and number', () => {
  const intRule = new Rule({
    type: 'int&number',
  }, null);

  expect(intRule.test(3)).toBe(true);
});
