const { Rule } = require('../../src');

hljs.initHighlightingOnLoad(); // eslint-disable-line
hljs.initLineNumbersOnLoad(); // eslint-disable-line


const $ = a => document.querySelectorAll(a); // eslint-disable-line

$('pre code').forEach((block) => {
  hljs.lineNumbersBlock(block); // eslint-disable-line
});

const PhoneNumber = new Rule({
  type: 'string-int',
  minLength: 10,
  maxLength: 10,
  match: /0(7|6).*/,
});

const email = new Rule({
  type: 'email',
  domain: d => ['hotmail', 'outlook', 'gmail'].indexOf(d) !== -1,
});

const password = new Rule({
  type: 'password',
  minLength: 8,
  maxLength: 10,
  matchesOneOf: ['@', '_', '-', '.', '?', '$'],
  numbers: 1,
  uppercase: 1,
});

const url = new Rule({
  type: 'url',
  domain: domain => domain === 'github.com',
  protocol: protocol => protocol === 'https',
});

const country = new Rule({
  type: 'string',
  oneOf: ['FR', 'US', 'EN'],
});
const zipcode = new Rule({
  type: 'string-int',
  minLength: 5,
  maxLength: 5,
});

const street = new Rule({
  type: 'string',
  notEmpty: true,
});

const streetNumber = new Rule({
  type: 'string-int',
});

const rules = {
  'phone-number': PhoneNumber,
  password,
  email,
  url,
  zipcode,
  street,
  'street-number': streetNumber,
  country,

};


$('*[data-type]').forEach((e) => {
  e.addEventListener('keyup', (evt) => {
    const elem = evt.target;
    const { type } = elem.dataset;
    if (!rules[type]) {
      return;
    }
    if (!rules[type].test(elem.value)) {
      elem.classList.add('err');
      elem.classList.remove('valid');
    } else {
      elem.classList.remove('err');
      elem.classList.add('valid');
    }
  });
});
