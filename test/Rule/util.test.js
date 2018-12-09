const { looseEqual } = require('../../src/util');

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
