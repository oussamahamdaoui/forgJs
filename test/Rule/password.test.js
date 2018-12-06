const { Rule } = require('../../src');

test('type test not password is false', () => {
  const passwordRule = new Rule({
    type: 'password',
  }, null);

  expect(passwordRule.test([])).toBe(false);
});


test('number', () => {
  const passwordRule = new Rule({
    type: 'password',
    numbers: 5,
  }, null);

  expect(passwordRule.test('Aaz4a2 45 5')).toBe(true);
});

test('uppercase', () => {
  const passwordRule = new Rule({
    type: 'password',
    uppercase: 5,
  }, null);

  expect(passwordRule.test('AAbdeAdcdAA')).toBe(true);
});
