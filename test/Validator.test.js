const { Rule, Validator } = require('../src');

test('test the hole object', () => {
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
  });

  expect(vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
  })).toBe(true);
});

test('test custom', () => {
  function f(age, object) {
    if (age === Math.floor((new Date() - object.dateOfBirth) / 1000 / 60 / 60 / 24 / 30 / 12)) {
      return true;
    }
    return false;
  }
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99, custom: f,
    }),
    dateOfBirth: new Rule({ type: 'date' }),
  });

  expect(vComplexe.test({
    age: 23,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
  })).toBe(true);
});

test('test ', () => {
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
  });

  expect(vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
  })).toBe(true);
});
