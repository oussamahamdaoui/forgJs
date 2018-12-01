const { Rule } = require('../../src');

test('type rulle.getError() returns array of errors when input is wrong', () => {
  const strRule = new Rule({
    type: 'string',
  }, 'strRule must be string');

  expect(strRule.getError(1)).toBe('strRule must be string');
});
