const { Rule, Validator } = require('../../src');

test('test the hole object to be true', () => {
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

test('test the hole object to be false', () => {
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
  });

  expect(vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: [1],
  })).toBe(false);
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


test('test getErrors must return an array of errors', () => {
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }, 'age must be integer and between 18 and 99'),
    dateOfBirth: new Rule({ type: 'date' }, 'date must be a date'),
  });

  expect(vComplexe.getErrors({
    age: 16,
    dateOfBirth: new Date(),
  })).toEqual(['age must be integer and between 18 and 99']);
});

test('test test over an array of values', () => {
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }),
  });

  expect(vComplexe.testAll([{
    age: 19,
  }, {
    age: 16,
  }])).toBe(1);
});

test('test over multiple values and return -1', () => {
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }),
  });

  expect(vComplexe.testAll([{
    age: 19,
  }, {
    age: 20,
  }])).toBe(-1);
});
