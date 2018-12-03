const { Rule } = require('../../src');

test('type test not number is false', () => {
  const numberRule = new Rule({
    type: 'number',
  }, null);

  expect(numberRule.test([])).toBe(false);
});

test('type test', () => {
  const numberRule = new Rule({
    type: 'number',
  }, null);

  expect(numberRule.test(2)).toBe(true);
});

test('max is true if < 100', () => {
  const numberRule = new Rule({
    type: 'number',
    max: 100,
  }, null);

  expect(numberRule.test(99)).toBe(true);
});

test('max is false if  > 100', () => {
  const numberRule = new Rule({
    type: 'number',
    max: 100,
  }, null);

  expect(numberRule.test(101)).toBe(false);
});

test('equal returns true if 100', () => {
  const numberRule = new Rule({
    type: 'number',
    equal: 100,
  }, null);

  expect(numberRule.test(100)).toBe(true);
});


test('custom rulle should return true', () => {
  const numberRule = new Rule({
    type: 'number',
    custom: val => val % 2 === 0,
  }, null);

  expect(numberRule.test(4)).toBe(true);
});

test('custom rulle should return false', () => {
  const numberRule = new Rule({
    type: 'number',
    custom: val => val % 2 === 0,
  }, null);

  expect(numberRule.test(3)).toBe(false);
});

test('mixng rulles returns true', () => {
  const numberRule = new Rule({
    type: 'number',
    max: 50,
    min: 5,
    custom: val => val % 2 === 0,
  }, null);

  expect(numberRule.test(6)).toBe(true);
});

test('mixng rulles returns false', () => {
  const numberRule = new Rule({
    type: 'number',
    max: 50,
    min: 5,
    custom: val => val % 2 === 0,
  }, null);

  expect(numberRule.test(1)).toBe(false);
});

test('throws error when test doesn\'t exist', () => {
  expect(() => {
    const numberRule = new Rule({
      type: 'number',
      test: false,
    }, null);
    numberRule.test(3);
  }).toThrow();
});

test('returns true if optional set to true and patram undefined', () => {
  const numberRule = new Rule({
    type: 'number',
    optional: true,
  }, null);
  expect(numberRule.test()).toBe(true);
});

test('returns false if optional set to true and patram dont match', () => {
  const numberRule = new Rule({
    type: 'number',
    optional: true,
  }, null);
  expect(numberRule.test('hello')).toBe(false);
});

test('returns true if optional set to true and patram match', () => {
  const numberRule = new Rule({
    type: 'number',
    optional: true,
  }, null);
  expect(numberRule.test(150)).toBe(true);
});

test('returns true if optional set to false and patram match', () => {
  const numberRule = new Rule({
    type: 'number',
    optional: false,
  }, null);
  expect(numberRule.test(150)).toBe(true);
});

test('returns false if optional set to false and patram dont match', () => {
  const numberRule = new Rule({
    type: 'number',
    optional: false,
  }, null);
  expect(numberRule.test('150')).toBe(false);
});
