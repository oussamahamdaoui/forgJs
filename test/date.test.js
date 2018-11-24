const {Rule} = require('../src');

test('throws error when test doesn\'t exist', () => {
  const dateRule = new Rule({
    type:  "date",
    dummyTest: /^The/g,
  }, null);
  expect(()=>{dateRule.test("the quick brown fox")}).toThrow();
});


test('returns false when not date', () => {
  let start = new Date(2018, 11, 24);
  let date2 = new Date(2018, 11, 24)
  const dateRule = new Rule({
    type:  "date",
  }, null);
  expect(dateRule.test("the quick brown fox")).toBe(false);
});

test('returns true when date is after a specific date', () => {
  let date = new Date(2018, 11, 1);
  let test = new Date(2018, 11, 2)
  const dateRule = new Rule({
    type:  "date",
    after:date
  }, null);

  expect(dateRule.test(test)).toBe(true);
});


test('returns true when date is before a specific date', () => {
  let date = new Date(2018, 11, 3);
  let test = new Date(2018, 11, 2);
  const dateRule = new Rule({
    type:  "date",
    before:date
  }, null);

  expect(dateRule.test(test)).toBe(true);
});

test('returns true when date is between two dates', () => {
  let date1 = new Date(2018, 11, 3);
  let date2 = new Date(2018, 11, 7);
  let test = new Date(2018, 11, 5);
  const dateRule = new Rule({
    type:  "date",
    between:[date1, date2]
  }, null);

  expect(dateRule.test(test)).toBe(true);
});

