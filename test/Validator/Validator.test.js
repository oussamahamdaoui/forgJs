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

test('test the hole object to be false extra values', () => {
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
  });

  expect(vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
    extraValue: '',
  })).toBe(false);
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
    const expectedAge = Math.floor((new Date() - object.dateOfBirth) / 3.154e+10);
    if (age === expectedAge) {
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

  const age = Math.floor((new Date() - new Date(1995, 10, 3)) / 3.154e+10);

  expect(vComplexe.test({
    age,
    dateOfBirth: new Date(1995, 10, 3),
  })).toBe(true);
});


test('test getErrors must return an array of errors', () => {
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }, 'age must be integer and between 18 and 99'),
    dateOfBirth: new Rule({ type: 'date' }, 'date must be a date'),
    name: new Rule({ type: 'string' }, (key, value) => `${key} must be a string, ${value} is not a string`),
  });

  expect(vComplexe.getErrors({
    age: 16,
    dateOfBirth: new Date(),
    name: 1,
  })).toEqual(['age must be integer and between 18 and 99', 'name must be a string, 1 is not a string']);
});

test('test getErrors return array of errors even with object as rule error', () => {
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }, {
      type: 'age must be an integer.',
      min: (key, value) => `age must be greater then 18, ${value} is not enough.`,
    }),
    dataOfBirth: new Rule({ type: 'date' }, 'date must be a date'),
  });

  expect(vComplexe.getErrors({
    age: 16,
    dateOfBirth: 1,
  })).toEqual([
    'dateOfBirth is unexpcted',
    'age must be greater then 18, 16 is not enough.',
    'date must be a date',
  ]);

  expect(vComplexe.getErrors({
    age: '16',
    dateOfBirth: 1,
  })).toEqual([
    'dateOfBirth is unexpcted',
    'age must be an integer.',
    'date must be a date',
  ]);

  expect(vComplexe.getErrors({
    age: 102, // there is no error definition for this key
    dateOfBirth: 1,
  })).toEqual([
    'dateOfBirth is unexpcted',
    'date must be a date',
  ]);
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
