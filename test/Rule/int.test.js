const { Rule } = require('../../src');

test('type test not int is false', () => {
  const intRule = new Rule({
    type: 'int',
  }, null);

  expect(intRule.test([])).toBe(false);
});

test('type test', () => {
  const intRule = new Rule({
    type: 'int',
  }, null);

  expect(intRule.test(2)).toBe(true);
});

test('max is true if < 100', () => {
  const intRule = new Rule({
    type: 'int',
    max: 100,
  }, null);

  expect(intRule.test(99)).toBe(true);
});

test('max is false if  > 100', () => {
  const intRule = new Rule({
    type: 'int',
    max: 100,
  }, null);

  expect(intRule.test(101)).toBe(false);
});

test('equal returns true if 100', () => {
  const intRule = new Rule({
    type: 'int',
    equal: 100,
  }, null);

  expect(intRule.test(100)).toBe(true);
});


test('custom rulle should return true', () => {
  const intRule = new Rule({
    type: 'int',
    custom: val => val % 2 === 0,
  }, null);

  expect(intRule.test(4)).toBe(true);
});

test('custom rulle should return false', () => {
  const intRule = new Rule({
    type: 'int',
    custom: val => val % 2 === 0,
  }, null);

  expect(intRule.test(3)).toBe(false);
});

test('mixng rulles returns true', () => {
  const intRule = new Rule({
    type: 'int',
    max: 50,
    min: 5,
    custom: val => val % 2 === 0,
  }, null);

  expect(intRule.test(6)).toBe(true);
});

test('mixng rulles returns false', () => {
  const intRule = new Rule({
    type: 'int',
    max: 50,
    min: 5,
    custom: val => val % 2 === 0,
  }, null);

  expect(intRule.test(1)).toBe(false);
});

test('throws error when test doesn\'t exist', () => {
  expect(() => {
    const intRule = new Rule({
      type: 'int',
      test: false,
    }, null);
    intRule.test(3);
  }).toThrow();
});

test('returns true if optional set to true and patram undefined', () => {
  const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
  expect(intRule.test()).toBe(true);
});

test('returns false if optional set to true and patram dont match', () => {
  const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
  expect(intRule.test('hello')).toBe(false);
});

test('returns true if optional set to true and patram match', () => {
  const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
  expect(intRule.test(150)).toBe(true);
});

test('returns true if optional set to false and patram match', () => {
  const intRule = new Rule({
    type: 'int',
    optional: false,
  }, null);
  expect(intRule.test(150)).toBe(true);
});

test('returns false if optional set to false and patram dont match', () => {
  const intRule = new Rule({
    type: 'int',
    optional: false,
  }, null);
  expect(intRule.test('150')).toBe(false);
});
