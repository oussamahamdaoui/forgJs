# Hey everyone! I'm really happy that this project reached so many stars 🎉, but it needs your contribution...

I started to better document the code, the main goal is to make it more accessible to other developers who want to contribute. I'm still the main maintainer of this project and I'm calling for your help to bring this code to perfection so if any of you want to contribute and you have a good idea of how to make this project better, please feel free to open an issue or a pull request.
Here is the full documentation (work in progress): [https://oussamahamdaoui.github.io/forgJs/](https://oussamahamdaoui.github.io/forgJs/)

Thank you! And don't forget to code with love ❤️

--------------


# ![forgJs logo](./media/logo.png?raw=true)

[![GitHub version](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs.svg)](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs)
[![npm](https://img.shields.io/npm/v/@cesium133/forgjs.svg)]( https://www.npmjs.com/package/@cesium133/forgjs)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![CircleCI (all branches)](https://img.shields.io/circleci/project/github/oussamahamdaoui/forgJs.svg)](https://circleci.com/gh/oussamahamdaoui/forgJs)
[![codecov](https://codecov.io/gh/oussamahamdaoui/forgJs/branch/master/graph/badge.svg)](https://codecov.io/gh/oussamahamdaoui/forgJs)
[![Maintainability](https://api.codeclimate.com/v1/badges/7bb3657e4e4111f22f2f/maintainability)](https://codeclimate.com/github/oussamahamdaoui/forgJs/maintainability)

[![](https://img.shields.io/twitter/url/http/shields.io.svg?style=social?style=flat-square)](https://twitter.com/forg_js)

ForgJS is a JavaScript lightweight object validator. Go check the 'Quick start' section and begin coding with love :heart:

![email](./media/email.gif?raw=true)

![password](./media/password.gif?raw=true)

![number](./media/number.gif?raw=true)

![url](./media/url.gif?raw=true)

See more live examples [here](https://oussamahamdaoui.github.io/forgjs-examples/)

# Quick start

Install ForgJS using npm by running `npm i @cesium133/forgjs`

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

const vComplex = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
    email: emailRule,
    password: passwordRule
});

vComplex.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
    email: 'dedede@yahoo.fr;',
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
## Test over an array

You can test over multiple arrays using this method:

```javascript
const vComplexe = new Validator({
    age: new Rule({
      type: 'int', min: 18, max: 99,
    }),
  });

  vComplexe.testAll([{
    age: 19,
  }, {
    age: 16,
  }]);  // returns 1
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

> If you only need to check the type, you can make a rule by simply passing a string: `new Rule('int');`

## Int

* min (int)
* max (int)
* equal (int)

## Boolean

* toBe (boolean)

## String

* minLength (int)
* maxLength (int)
* equal (string)
* match: (regex)
* notEmpty (bool)

## Email

* minLength (int)
* maxLength (int)
* equal (string)
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

## Password

* minLength (int)
* maxLength (int)
* equal (string)
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

## URL

* minLength (int)
* maxLength (int)
* equal (string)
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

## Date

* after (date)
* before (date)
* between (Array of dates like this [date, date])
* equal (date)

## Float

* min (Number)
* max (Number)
* equal (float)

## Array

* of (Rule or Validator object)
* notEmpty (bool)
* length (int)

The `of` rule checks every element of the array against the rule.

## Function

* result

An example is the best way to explain result:

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
## string-int, string-float, string-date, string-boolean

These types 'inherit' from string, they have both the properties, here are some examples:

### string-int

```javascript
const stringInt = new Rule({
  type: 'string-int',
  minLength: 2,
  min: 5,
}, null);

stringInt.test(2) // returns false 2 is not a string
stringInt.test('2a') // returns false '2a' is not a int
stringInt.test('2.1') // returns false '2.1' is not a int
stringInt.test('5') // returns false length of '5' is smaller than 2
stringInt.test('50') // returns true
```
### string-boolean

```javascript
const stringBoolean = new Rule({
  type: 'string-boolean',
  toBe: true
}, null);

stringBoolean.test(true) // returns false true is not a boolean
stringBoolean.test('false') // returns false 'false' is not true
stringBoolean.test('true') // returns true

```

```javascript
const stringDate = new Rule({
  type: 'string-date',
  after: new Date(2019, 11, 1),
}, null);

stringDate.test(new Date(2018, 11, 1)) // returns false new Date(2018, 11, 1) is not a string
stringDate.test('some string') // returns false 'some string' is not a valid date
stringDate.test('2018-12-17') // returns false '2018-12-17' is not after new Date(2019, 11, 1)
stringDate.test('2020-01-01') // returns true
```

**ForgJS tries to cast the value to the right type before passing it to the validation function so please be careful!**

Here is an example where Javascript behaviour makes the test go wrong:

```javascript
const stringDate = new Rule({
  type: 'string-date',
  equal: new Date(2019, 10, 1), // month in js strart at 0
}, null);

stringDate.test('2019-11-01') // returns false
stringDate.test('2019-11-01T00:00') // returns true


// this is because:

new Date(2019, 10, 1) - new Date('2019-11-01') // equals  3600000 thats exactly 1 hour

new Date(2019, 10, 1) - new Date('2019-11-01T00:00') // equals 0

```

## Multiple types

You can check for multiple types with `OR` or `AND` operators:

```javascript
  const intRule = new Rule({
    type: 'int|float|number',
  }, null);

  intRule.test(2) // returns true
```

This means the test should verify the `int`, `float` or `number` rule:

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

### Optional

If optional is set to `true` the element is optional and an `undefined` value is considered correct:

```javascript
const { Validator, Rule } = require('@cesium133/forgjs');

const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
intRule.test(); // returns true
```

### Custom

Custom allows you to write your own rules:

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
### OneOf

OneOf checks if the element is in a array
```javascript
  const floatRule = new Rule({
    type: 'float',
    oneOf: [3.5, 100.1, 7.2, 0.1],
  }, null);
  floatRule.test(100.1); // returns true
```

# Make a New Type

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

Thank you for contributing to make this code better, if you have suggestions or ideas how to improve the code please feel free to leave a comment here.
Rules:

### 1. Please use this template which will help developers to test and better understand your request

```javascript
const someRule= new Rule({
    type: 'yourType',
    prop1: val1,
    prop2: val2, ...
  }, null);

  someRule.test(validValue) // returns true
  someRule.test(invalidValue) // returns false
```

## 2. Please if you think a comment is a good feature to be added like the comment instead of creating a new one.

## 3. Before submitting a new comment check if the same comment is not already present

## 4. If you submit a PR (pull request) and you only change the Readme please add `[ci skip]` to your commit message

## 5. If you have any questions ask them in the FAQ

# Contact

Follow me on twitter at [@forg_js](https://twitter.com/forg_js "@forg_js")

# To-Do
(Work in progress)
