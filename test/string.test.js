const {Rule} = require('../src');

test('type string returns true when a string', () => {
  const strRulle = new Rule({
    type:  "string",
  }, null);

  expect(strRulle.test("dqsdqsd")).toBe(true);
  expect(strRulle.test(String("dqsdqsd"))).toBe(true);
});


test('type string returns false when not string', () => {
  const strRulle = new Rule({
    type:  "string",
  }, null);
  expect(strRulle.test({})).toBe(false);
});

test('type string returns true when matches a REGEX', () => {
  const strRulle = new Rule({
    type:  "string",
    match: /^The/g,
  }, null);
  expect(strRulle.test("The quick brown fox")).toBe(true);
});

test('type string returns false when doesen\'t matches a REGEX', () => {
  const strRulle = new Rule({
    type:  "string",
    match: /^The/g,
  }, null);
  expect(strRulle.test("the quick brown fox")).toBe(false);
});

test('throws error when test doesn\'t exist', () => {
  const strRulle = new Rule({
    type:  "string",
    dummyTest: /^The/g,
  }, null);
  expect(()=>{strRulle.test("the quick brown fox")}).toThrow();
});

test('type string returns false when string empty', () => {
  const strRulle = new Rule({
    type:  "string",
    notEmpty: true,
  }, null);
  expect(strRulle.test("the quick brown fox")).toBe(true);
});

test('type string returns false when string empty', () => {
  const strRulle = new Rule({
    type:  "string",
    notEmpty: true,
  }, null);
  expect(strRulle.test("")).toBe(false);
});

