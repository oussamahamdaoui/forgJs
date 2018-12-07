const { Rule } = require('../../src');

test('type email false', () => {
  const emailRule = new Rule({
    type: 'email',
  }, null);

  expect(emailRule.test([])).toBe(false);
});

test('type email', () => {
  const emailRule = new Rule({
    type: 'email',
  }, null);

  expect(emailRule.test('frfrfr')).toBe(false);
});

test('type email true', () => {
  const emailRule = new Rule({
    type: 'email',
  }, null);

  expect(emailRule.test('dedede@afe.fr')).toBe(true);
});

test('type user and domain true', () => {
  const emailRule = new Rule({
    type: 'email',
    user: user => user === 'dedede',
    domain: domain => ['outlook', 'gmail'].indexOf(domain) !== -1,
  }, null);

  expect(emailRule.test('dedede@gmail.fr')).toBe(true);
});
