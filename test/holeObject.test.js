const { Rule, Validator } = require('../src');

test('test the hole object', () => {
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
  });

  expect(vComplexe.test({
    age: 100,
    dateOfBirth: new Date(1995, 10, 3),
  })).toBe(false);
});
