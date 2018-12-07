const { Rule } = require('../../src');

test('type email false', () => {
  const urlRule = new Rule({
    type: 'url',
  }, null);

  expect(urlRule.test([])).toBe(false);
});

test('type url false', () => {
  const urlRule = new Rule({
    type: 'url',
  }, null);

  expect(urlRule.test('frfrfr')).toBe(false);
});


test('type url true', () => {
  const urlRule = new Rule({
    type: 'url',
  }, null);

  expect(urlRule.test('https://google.fr')).toBe(true);
});


test('type domain true', () => {
  const urlRule = new Rule({
    type: 'url',
    domain: domain => domain === 'google.fr',
  }, null);

  expect(urlRule.test('https://google.fr')).toBe(true);
});

test('type protocol true', () => {
  const urlRule = new Rule({
    type: 'url',
    protocol: prot => prot === 'https',
  }, null);

  expect(urlRule.test('https://google.fr')).toBe(true);
});
