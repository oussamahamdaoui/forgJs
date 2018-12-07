const { Rule } = require('../../src');

test('type email false', () => {
  const passwordRule = new Rule({
    type: 'email',
  }, null);

  expect(passwordRule.test([])).toBe(false);
});

test('type email', () => {
  const passwordRule = new Rule({
    type: 'email',
  }, null);

  expect(passwordRule.test('frfrfr')).toBe(false);
});

test('type email true', () => {
  const passwordRule = new Rule({
    type: 'email',
  }, null);

  expect(passwordRule.test('dedede@afe.fr')).toBe(true);
});

test('type user true', () => {
  const passwordRule = new Rule({
    type: 'email',
    user: user => user === 'dedede',
    domain: domain => ['outlook', 'gmail'].indexOf(domain) !== -1,
  }, null);

  expect(passwordRule.test('dedede@gmail.fr')).toBe(true);
});
