# ![forgJs logo](./logo.png?raw=true)

[![GitHub version](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs.svg)](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs)
[![npm](https://img.shields.io/npm/v/@cesium133/forgjs.svg)]( https://www.npmjs.com/package/@cesium133/forgjs)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![CircleCI (all branches)](https://img.shields.io/circleci/project/github/oussamahamdaoui/forgJs.svg)](https://circleci.com/gh/oussamahamdaoui/forgJs)
[![codecov](https://codecov.io/gh/oussamahamdaoui/forgJs/branch/master/graph/badge.svg)](https://codecov.io/gh/oussamahamdaoui/forgJs)

ForgJs is a JavaScript lightweight object validator. Go check the Quick start section and start coding with love :heart:

# Quick start

Install it via npm by running `npm i @cesium133/forgjs`

## Your first validator

```javascript
  const { Validator, Rule } = require('@cesium133/forgjs');

  const emailRule = new Rule({
    type: 'email',
    user: user => user === 'dedede',
    domain: domain => ['outlook', 'gmail', 'yahoo'].indexOf(domain) !== -1,
  }, null);
  
  const passwordRule = new Rule({
    type: 'password',
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!'],
  }, null);

  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
    email: emailRule
    pasword: passwordRule
  });

  vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
    email: 'my-email@yahoo.fr;',
    password: 'ad1_A@@Axs',
  }); /// returns true

  ```

## Error handling

You can get custom error messages by doing this:

```javascript
const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }, 'age must be integer and between 18 and 99'),
    dateOfBirth: new Rule({ type: 'date' }, 'date must be a date'),
  });

  vComplexe.getErrors({
    age: 16,
    dateOfBirth: 123,
  }); // ['age must be integer and between 18 and 99', 'date must be a date']

```

# Rules

A `Rule` object validates a single value, it can be used like this: 

```javascript
  const { Validator, Rule } = require('@cesium133/forgjs');
  const floatRule = new Rule({
    type: 'float',
    min: 100,
  }, null);

  floatRule.test(2.001); /// returns true;
```

**The only required value is `type`!**

> You can make a rule by simply passing a string if you only need to check the type : `new Rule("int");`

## int

* min (int)
* max (int)
* equal (int)

## boolean

* toBe (boolean)

## string

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)

## email

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)
* user (`function(user)`)
* domain (`function(domain)`)

```javascript
  const emailRule = new Rule({
    type: 'email',
    user: user => user === 'dedede',
    domain: domain => ['outlook', 'gmail', 'yahoo'].indexOf(domain) !== -1,
  }, null);

  emailRule.test('dedede@gmail.fr'); // returns true
```

## password

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)
* uppercase (int)
* number (int)
* mathesOneOf (Array)
* matchesAllOf (Array)

```javascript
  const passwordRule = new Rule({
    type: 'password',
    minLength: 8,
    uppercase: 1,
    numbers: 1,
    matchesOneOf: ['@', '_', '-', '.', '!'],
  }, null);

  passwordRule.test('@_-bddcd6A'); // returns true
```

## url

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)
* protocol (`function(protocol)`)
* domain (`function(domain)`)

```javascript
  const urlRule = new Rule({
    type: 'url',
    protocol: prot => prot === 'https',
    domain: domain => domain === 'google.fr',
  }, null);

  urlRule.test('https://google.fr'); // returns true
```

## date

* after (date)
* before (date)
* between (Array of dates like this [date, date])
* equal (date)

## float

* min (Number)
* max (Number)
* equal (float)

## array

* of (Rule or Validator object)
* notEmpty (bool)
* length (int)

The `of` rule checks every element of the array against the rule.

## function

* result

To explain result, what's better than an example:

```javascript
  const { Validator, Rule } = require('@cesium133/forgjs');

  function someFunctionThatReturnsAnInt(int) {
    return int * 5;
  }

  const functionTest = new Rule({
    type: 'function',
    result: {
      of: 5,
      toBe: new Rule('int'),
    },
  }, null);

  functionTest.test(someFunctionThatReturnsAnInt); /// returns true;

  ```

## Multiple types

You can check for multiple types with `OR` or `AND` operators like this:

```javascript
  const intRule = new Rule({
    type: 'int|float|number',
  }, null);

  intRule.test(2) // returns true
```

This means the test should verify the `int`, `float` or `number` rule

```javascript
  const intRule = new Rule({
    type: 'int&number',
  }, null);
  intRule.test(2.1); // returns false
```

The result doesn't match the `int` rule

## Common properties

Every type has these properties:

* optional
* custom
* oneOf

### optional

If optional is set to `true` the element is optional and an `undefined` value is considered correct.
Example:

```javascript
const { Validator, Rule } = require('@cesium133/forgjs');

const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
intRule.test(); // returns true
```

### custom

Custom allows you to write your own rule, an example is better than a long explanation:

```javascript
  const { Validator, Rule } = require('@cesium133/forgjs');
  
  function isCorrectAge(age, object) {
    if (age === Math.floor((new Date() - object.dateOfBirth) / 1000 / 60 / 60 / 24 / 30 / 12)) {
      return true;
    }
    return false;
  }
  const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99, custom: isCorrectAge,
    }),
    dateOfBirth: new Rule({ type: 'date' }),
  });

  vComplexe.test({
    age: 23,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
  }); // returns true

```
### oneOf

One of checks if the element is in a array
```javascript
  const floatRule = new Rule({
    type: 'float',
    oneOf: [3.5, 100.1, 7.2, 0.1],
  }, null);
  floatRule.test(100.1); // returns true
```

# Make a new type

Creating a new type is done using the Rule class like this:

```javascript
  const { Validator, Rule } = require('@cesium133/forgjs'); 
  
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

  customInteger.test(11) // returns true

  customInteger.test(200) // returns false

```

# How to contribute

Thank you everyone for contributing to make this code better, if you have suggestions or ideas to improve the code please feel free to leave a comment here #29.
Rules:

### 1 Please use this template which will help developers to test and better understand your request

```javascript
const someRule= new Rule({
    type: 'yourType',
    prop1: val1,
    prop2: val2, ...
  }, null);

  someRule.test(validValue) // returns true
  someRule.test(invalidValue) // returns false
```

### 2 Please if you think a comment is a good feature to be added like the comment instead of creating a new one.

### 3 Before submitting a new comment check if the same comment is not already present

### 4 If you submit a PR (pull request) and you only change the Readme please add `[ci skip]` to your commit message

### 5 If you have any questions ask them in the FAQ

# 6 Please have fun, and if you feel like not following the rules then don't follow them

code with love :heart:

# Left TO DO for next release

* [x] Add function type
* [x] Add error management
* [x] Add multiple types possible
* [x] Add oneOf to primitive types
* [ ] Add twitter bot for releases
* [x] Add password type
* [x] Add Email type
* [x] Add link type
* [x] Add boolean type
# Contact

Follow me on twitter at [@forg_js](https://twitter.com/forg_js "@forg_js")
