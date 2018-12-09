const { Rule, Validator } = require('../../src');

test('returns true when its an array', () => {
  const arrayRule = new Rule({
    type: 'array',
  }, null);
  expect(arrayRule.test([])).toBe(true);

  // eslint-disable-next-line
  expect(arrayRule.test(new Array())).toBe(true);
});

test('returns true when aray is not empty', () => {
  const elemntsRule = new Rule({
    type: 'int',
  });

  const arrayRule = new Rule({
    type: 'array',
    of: elemntsRule,
    notEmpty: true,
  }, null);
  expect(arrayRule.test([])).toBe(false);
});

test('returns true when all elems verify the rule', () => {
  const elemntsRule = new Rule({
    type: 'string',
    maxLength: 2,
  });

  const arrayRule = new Rule({
    type: 'array',
    of: elemntsRule,
  }, null);
  expect(arrayRule.test(['1', '2', '1'])).toBe(true);
});


test('returns true when array contains 3 elems', () => {
  const arrayRule = new Rule({
    type: 'array',
    length: 3,
  }, null);
  expect(arrayRule.test(['1', '2', '1'])).toBe(true);
});

test('returns false when array contains elements that dont match', () => {
  const arrayRule = new Rule({
    type: 'array',
    of: new Rule('int'),
  }, null);
  expect(arrayRule.test(['1', '2', '1'])).toBe(false);
});

test('returns true when elements verify the validator', () => {
  const users = new Validator({
    name: new Rule('string'),
    age: new Rule('int'),
  });

  const arrayRule = new Rule({
    type: 'array',
    of: users,
  });
  expect(arrayRule.test([{ name: 'Meee', age: 23 }])).toBe(true);
});

test('returns true when array is one of validator', () => {
  const arrayRule = new Rule({
    type: 'array',
    oneOf: [[{ name: 'Meee', age: 23 }], [{ name: 'haaa', age: 27 }]],
  });
  expect(arrayRule.test([{ name: 'Meee', age: 23 }])).toBe(true);
});
