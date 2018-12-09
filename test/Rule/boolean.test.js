const { Rule } = require('../../src');

test('boolean returns true if true tested', () => {
  const rule = new Rule({
    type: 'boolean',
  }, null);

  expect(rule.test(true)).toBe(true);
});

test('boolean returns true if false tested', () => {
  const rule = new Rule({
    type: 'boolean',
    toBe: false,
  }, null);

  expect(rule.test(false)).toBe(true);
});
