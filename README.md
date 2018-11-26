# forgJs
[![GitHub version](https://badge.fury.io/gh/oussamahamdaoui%2Fjs-object-validator.svg)](https://badge.fury.io/gh/oussamahamdaoui%2Fjs-object-validator) [![npm version](https://badge.fury.io/js/%40cesium133%2Fjs-object-validator.svg)](https://badge.fury.io/js/%40cesium133%2Fjs-object-validator)

forgJs is a javascript lightweight object validator. Go check the Quick start section and start coding with love :heart:

# Quick start

install it via npm by runing `npm i @cesium133/js-object-validator`

## Your first validator:

```javascript 
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
# Rule object

A `Rule` object validates a single value, it can be used like this: 

```javascript
  const floatRule = new Rule({
    type: 'float',
    min: 100,
  }, null);

  floatRule.test(2.001); /// returns true;
```
> **The only required value is `type`!**

## `int` Rule

* min (int)
* max (int)
* equal (int)

## `string` Rule

* minLength (int)
* maxLength (int)
* equal (int)
* match: (regex)
* notEmpty (bool)

## `date` Rule 

* after (date)
* before (date)
* between (Array of dates like this [date, date])
* equal (date)

## `float` Rule

* min (Number)
* max (Number)
* equal (float)

## array Rule

* of (Rule)
* notEmpty (bool)
* length (int)

The `of` rule checks every element of the array against the rule.

## Common properties:

Every type has: 
* optional
* custom

### `optional`

If optional is set to `true` the element is optional and an `undefined` value is considered correct.
Exemple:

```javascript
const intRule = new Rule({
    type: 'int',
    optional: true,
  }, null);
intRule.test(); // returns true
```
### `custom`

Custom allaws you to write your own rule, an exemple is better than a long explenation:

```javascript

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
