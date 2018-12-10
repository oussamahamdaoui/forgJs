const { Rule } = require('../../src');

test('non valid string boolean', () => {
  const stringBoolean = new Rule({
    type: 'string-boolean',
  }, null);

  expect(stringBoolean.test('hello')).toBe(false);
});

test('valid string boolean', () => {
  const stringBoolean = new Rule({
    type: 'string-boolean',
  }, null);

  expect(stringBoolean.test('true')).toBe(true);
  expect(stringBoolean.test('false')).toBe(true);
});

test('string boolean is true', () => {
  const stringBoolean = new Rule({
    type: 'string-boolean',
    toBe: true,
  }, null);

  expect(stringBoolean.test('true')).toBe(true);
  expect(stringBoolean.test('false')).toBe(false);
});
