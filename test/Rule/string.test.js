const { Rule } = require('../../src');

test('type string returns true when a string', () => {
  const strRule = new Rule({
    type: 'string',
  }, null);

  expect(strRule.test('dqsdqsd')).toBe(true);
  expect(strRule.test(String('dqsdqsd'))).toBe(true);
});


test('type string returns false when not string', () => {
  const strRule = new Rule({
    type: 'string',
  }, null);
  expect(strRule.test({})).toBe(false);
});

test('type string returns true when matches a REGEX', () => {
  const strRule = new Rule({
    type: 'string',
    match: /^The/g,
  }, null);
  expect(strRule.test('The quick brown fox')).toBe(true);
});

test('type string returns false when doesen\'t matches a REGEX', () => {
  const strRule = new Rule({
    type: 'string',
    match: /^The/g,
  }, null);
  expect(strRule.test('the quick brown fox')).toBe(false);
});

test('throws error when test doesn\'t exist', () => {
  expect(() => {
    const strRule = new Rule({
      type: 'string',
      dummyTest: /^The/g,
    }, null);
    strRule.test('the quick brown fox');
  }).toThrow();
});

test('type string returns false when string empty', () => {
  const strRule = new Rule({
    type: 'string',
    isEmpty: false,
  }, null);
  expect(strRule.test('the quick brown fox')).toBe(false);
});

test('type string returns true when string empty', () => {
  const strRule = new Rule({
    type: 'string',
    isEmpty: false,
  }, null);
  expect(strRule.test('')).toBe(true);
});

test('type string returns false when two strings are equal', () => {
  const strRule = new Rule({
    type: 'string',
    isEmpty: false,
    equal: 'hello',
  }, null);
  expect(strRule.test('hello')).toBe(false);
});

test('type string returns false when string minLength', () => {
  const strRule = new Rule({
    type: 'string',
    isEmpty: false,
    minLength: 2,
  }, null);
  expect(strRule.test('hello')).toBe(false);
});
