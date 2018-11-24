const {Rule} = require('../src');

test('type test', () => {
  const intRulle = new Rule({
    type:  "int",
  }, null);

  expect(intRulle.test([])).toBe(false);
});

test('type test', () => {
  const intRulle = new Rule({
    type:  "int",
  }, null);

  expect(intRulle.test(2)).toBe(true);
});

test('max is true if < 100', () => {
  const intRulle = new Rule({
    type:  "int",
    max: 100
  }, null);

  expect(intRulle.test(99)).toBe(true);
});

test('max is false if  > 100', () => {
  const intRulle = new Rule({
    type:  "int",
    max: 100
  }, null);

  expect(intRulle.test(101)).toBe(false);
});

test('equal returns true if 100', () => {
  const intRulle = new Rule({
    type:  "int",
    equal: 100
  }, null);

  expect(intRulle.test(100)).toBe(true);
});



test('custom rulle should return true', () => {
  const intRulle = new Rule({
    type:  "int",
    custom: val => val % 2 == 0
  }, null);

  expect(intRulle.test(4)).toBe(true);
});

test('custom rulle should return false', () => {
  const intRulle = new Rule({
    type:  "int",
    custom: val => val % 2 == 0 
  }, null);

  expect(intRulle.test(3)).toBe(false);
});

test('mixng rulles returns true', () => {
  const intRulle = new Rule({
    type:  "int",
    max:50,
    min: 5,
    custom: val => val % 2 == 0
  }, null);

  expect(intRulle.test(6)).toBe(true);
});

test('mixng rulles returns false', () => {
  const intRulle = new Rule({
    type:  "int",
    max:50,
    min: 5,
    custom: val => val % 2 == 0
  }, null);

  expect(intRulle.test(1)).toBe(false);
});

test('throws error when test doesn\'t exist', () => {
  const intRulle = new Rule({
    type:  "int",
    test: /^The/g,
  }, null);
  expect(()=>{intRulle.test("the quick brown fox")}).toThrow();
});