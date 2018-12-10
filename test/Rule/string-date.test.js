const { Rule } = require('../../src');

test('type test not valid string is false', () => {
  const stringDate = new Rule({
    type: 'string-date',
  }, null);

  expect(stringDate.test(new Date(2018, 11, 1))).toBe(false);
});


test('valid date', () => {
  const numberRule = new Rule({
    type: 'string-date',
  }, null);

  expect(numberRule.test('1995-12-17T03:24:00')).toBe(true);
});


test('date is after', () => {
  const numberRule = new Rule({
    type: 'string-date',
    after: new Date(2018, 11, 1),
  }, null);

  expect(numberRule.test('2019-12-17')).toBe(true);
});

test('date is before', () => {
  const numberRule = new Rule({
    type: 'string-date',
    before: new Date(2018, 11, 1),
  });

  expect(numberRule.test('2019-12-17')).toBe(false);
});


test('date is equal', () => {
  const numberRule = new Rule({
    type: 'string-date',
    equal: new Date(2018, 10, 1), // javascript moth start from 0
  });
  expect(numberRule.test('2018-11-01T00:00')).toBe(true); // You need to specify time otherise default time is set to 01:00
});
