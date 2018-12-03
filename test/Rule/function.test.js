const { Rule } = require('../../src');

test('returns true if function', () => {
  const functionRule = new Rule({
    type: 'function',
  }, null);

  expect(functionRule.test(() => {})).toBe(true);
});

test('returns true if function result matches a Rule', () => {
  function someFunctionThatReturnsAnInt(int) {
    return int * 5;
  }

  const functionTest = new Rule({
    type: 'function',
    result: {
      of: 5,
      toBe: new Rule('int'),
    },
  }, null);

  expect(functionTest.test(someFunctionThatReturnsAnInt)).toBe(true);
});

test('returns false if function result doesn\'t match a Rule', () => {
  const functionRule = new Rule({
    type: 'function',
    result: {
      of: 5,
      toBe: new Rule('int'),
    },
  }, null);

  expect(functionRule.test(() => 'val - 10')).toBe(false);
});
