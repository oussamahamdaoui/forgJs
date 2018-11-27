const { Rule } = require('../src');

test('adding a custom rule', () => {
  Rule.addCustom('customInteger', {
    min: (val, min) => val - min > 0,
    max: (val, max) => val - max < 0,
    equal: (val, equal) => val === equal,
    type: val => Number.isInteger(val) && val > 0 && val < 100,
  });

  const customInteger = new Rule({
    type: 'customInteger',
    min: 10,
  }, null);

  expect(customInteger.test(11)).toBe(true);

  expect(customInteger.test(200)).toBe(false);
});
