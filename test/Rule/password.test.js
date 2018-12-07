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

  expect(passwordRule.test('Aa6z6666')).toBe(true);
});

test('uppercase', () => {
  const passwordRule = new Rule({
    type: 'password',
    uppercase: 5,
  }, null);

  expect(passwordRule.test('@_6b6ddcdA')).toBe(false);
});


test('matcesOneOf', () => {
  const passwordRule = new Rule({
    type: 'password',
    matchesOneOf: ['@', '_', '-'],
  }, null);

  expect(passwordRule.test('AAbd_AdcdAA')).toBe(true);
});

test('matcesOneOf without mach', () => {
  const passwordRule = new Rule({
    type: 'password',
    matchesOneOf: ['@', '_', '-'],
  }, null);

  expect(passwordRule.test('AAbdAdcdAA')).toBe(false);
});

test('matchesAllOf', () => {
  const passwordRule = new Rule({
    type: 'password',
    matchesAllOf: ['@', '_', '-'],
  }, null);

  expect(passwordRule.test('A@_-AbdAdcdAA')).toBe(true);
});

test('matchesAllOf false', () => {
  const passwordRule = new Rule({
    type: 'password',
    matchesAllOf: ['@', '_', '-'],
  }, null);

  expect(passwordRule.test('A@-AbdAdcdAA')).toBe(false);
});

test('specialChars false', () => {
  const passwordRule = new Rule({
    type: 'password',
    specialChars: 2,
  }, null);

  expect(passwordRule.test('A@AbdAdcdAA')).toBe(false);
});

test('good password', () => {
  const passwordRule = new Rule({
    type: 'password',
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!'],
  }, null);

  expect(passwordRule.test('@_-bddcd6A')).toBe(true);
});
