# ![forgJs logo](./logo.png?raw=true)

[![GitHub version](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs.svg)](https://badge.fury.io/gh/oussamahamdaoui%2Fforgjs)
[![npm](https://img.shields.io/npm/v/@cesium133/forgjs.svg)]( https://www.npmjs.com/package/@cesium133/forgjs)
![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)
[![CircleCI (all branches)](https://img.shields.io/circleci/project/github/oussamahamdaoui/forgJs.svg)](https://circleci.com/gh/oussamahamdaoui/forgJs)
[![codecov](https://codecov.io/gh/oussamahamdaoui/forgJs/branch/master/graph/badge.svg)](https://codecov.io/gh/oussamahamdaoui/forgJs)


ForgJs is a JavaScript lightweight object validator. Go check the Quick start section and start coding with love :heart:

# Quick start

Install it via npm by runing `npm i @cesium133/forgjs`

## Your first validator:

```javascript 
  const { Validator, Rule } = require('@cesium133/forgjs');
  
  const vComplexe = new Validator({
    age: new Rule({ type: 'int', min: 18, max: 99 }),
    dateOfBirth: new Rule({ type: 'date' }),
    array: new Rule({ type: 'array', of: new Rule({ type: 'string' }) }),
  });

  vComplexe.test({
    age: 26,
    dateOfBirth: new Date(1995, 10, 3),
    array: ['1'],
  }); /// returns true

  ```
## Error handling

You can get custom message errors by doing this:

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

## int type

* min (int)
* max (int)
* equal (int)

## string type

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)

## date type 

* after (date)
* before (date)
* between (Array of dates like this [date, date])
* equal (date)

## float type

* min (Number)
* max (Number)
* equal (float)

## array type

* of (Rule or Validator object)
* notEmpty (bool)
* length (int)

The `of` rule checks every element of the array against the rule.

## function type

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
## Multiple types:

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

## Common properties:

Every type has these properties: 
* optional
* custom

### optional

If optional is set to `true` the element is optional and an `undefined` value is considered correct.
Exemple:

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
# Make a new type:

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

# Left TO DO for next release

- [x] Add function type
- [x] Add error managment
- [x] Add multiple types possible
- [ ] Add multiple custom functions
- [ ] Add oneOf to primitif types
- [ ] Add twitter bot for releases

# Contact

Folow me on twitter at [@forg_js](https://twitter.com/forg_js "@forg_js")
