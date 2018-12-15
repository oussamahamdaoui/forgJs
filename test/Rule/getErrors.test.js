const { Rule } = require('../../src');

test('type rule.getError() returns array of errors when input is wrong', () => {
  const strRule = new Rule({
    type: 'string',
  }, 'strRule must be string');

  expect(strRule.getError(1)).toBe('strRule must be string');
});

test('type rule.getError() call error function (if the error of the rule is function)', () => {
  const strRule = new Rule({
    type: 'string',
  }, (key, value) => `${key} must be a string, ${value} is not a string`);

  expect(strRule.getError('something', 1)).toBe('something must be a string, 1 is not a string');
});
