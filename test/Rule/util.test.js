const { looseEqual, flattenObject } = require('../../src/util');

test('looseEqual object false', () => {
  const a = {
    a: 'hello',
    b: 'cccc',
  };

  const b = {
    a: 'cd',
    b: 'cc',
  };

  expect(looseEqual(a, b)).toBe(false);
});

test('looseEqual object true', () => {
  const a = {
    a: 'hello',
    b: 'cccc',
  };

  const b = {
    a: 'hello',
    b: 'cccc',
  };

  expect(looseEqual(a, b)).toBe(true);
});

test('looseEqual object and array fals', () => {
  const a = {
    a: 'hello',
    b: 'cccc',
  };

  const b = [
    'hello',
    'cccc',
  ];

  expect(looseEqual(a, b)).toBe(false);
});


test('flatten Object', () => {
  const a = {
    a: 'hello',
    b: {
      d: 'dazda',
    },
  };
  expect(flattenObject(a)).toEqual({ a: 'hello', 'b.d': 'dazda' });
});
