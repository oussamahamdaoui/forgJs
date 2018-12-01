const { traverse, getValFromPath } = require('../../src/Validator/util');

test('test getValFromPath returns 5 path is correct', () => {
  const obj = {
    a: {
      b: 5,
    },
  };
  expect(getValFromPath('a.b', obj)).toBe(5);
});


test('test travers', (done) => {
  const obj = {
    a: {
      b: 5,
    },
  };
  traverse(obj, (val, path) => {
    expect(val).toBe(5);
    expect(path).toBe('a.b');
    done();
  });
});
