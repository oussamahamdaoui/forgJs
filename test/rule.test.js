const { Rule } = require('../src');

test('adding a custom rule', () => {
  Rule.addCustom('anotherRule', {
    min: (val, min) => val - min > 0,
    max: (val, max) => val - max < 0,
    equal: (val, equal) => val === equal,
    type: val => Number.isInteger(val),
  });

  const arrayRule = new Rule({
    type: 'anotherRule',
    min: 10,
  }, null);

  expect(arrayRule.test(11)).toBe(true);

  expect(arrayRule.test(5)).toBe(false);
});
