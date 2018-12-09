const { Rule } = require('../../src');

test('throws error when test doesn\'t exist', () => {
  expect(() => {
    const rule = new Rule({
      type: 'date',
      dummyTest: /^The/g,
    }, null);
    rule.test();
  }).toThrow();
});


test('returns false when not date', () => {
  const dateRule = new Rule({
    type: 'date',
  }, null);
  expect(dateRule.test('the quick brown fox')).toBe(false);
});

test('returns true when date is after a specific date', () => {
  const date = new Date(2018, 11, 1);
  const test = new Date(2018, 11, 2);
  const dateRule = new Rule({
    type: 'date',
    after: date,
  }, null);

  expect(dateRule.test(test)).toBe(true);
});


test('returns true when date is before a specific date', () => {
  const date = new Date(2018, 11, 3);
  const test = new Date(2018, 11, 2);
  const dateRule = new Rule({
    type: 'date',
    before: date,
  }, null);

  expect(dateRule.test(test)).toBe(true);
});

test('returns true when date is between two dates', () => {
  const date1 = new Date(2018, 11, 3);
  const date2 = new Date(2018, 11, 7);
  const test = new Date(2018, 11, 5);
  const dateRule = new Rule({
    type: 'date',
    between: [date1, date2],
  }, null);

  expect(dateRule.test(test)).toBe(true);
});


test('returns true when two dates are equal', () => {
  const date1 = new Date(2018, 11, 3);
  const dateRule = new Rule({
    type: 'date',
    equal: date1,
  }, null);

  expect(dateRule.test(date1)).toBe(true);
});

test('returns true when date is one of array', () => {
  const date1 = new Date(2018, 11, 3);
  const dateRule = new Rule({
    type: 'date',
    oneOf: [new Date(2018, 11, 3), new Date()],
  }, null);

  expect(dateRule.test(date1)).toBe(true);
});
