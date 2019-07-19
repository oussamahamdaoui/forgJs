const isArray = arr => Array.isArray(arr);

const isString = str => typeof str === 'string' || str instanceof String;

const isInt = val => Number.isInteger(val);

const isFunction = func => func !== null && typeof func === 'function';

/**
 * Regex that validates if a string is a valid url
 */
const URL_REGEX = /^\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/; // eslint-disable-line

const isObject = obj => obj !== null && typeof obj === 'object';

const AND = (v1, v2) => v1 && v2;
const OR = (v1, v2) => v1 || v2;

/**
 * Checks if two bojects are loosly equal
 * @param {any} a first object
 * @param {any} b second object
 *
 * @return {boolean}
 */
const looseEqual = (a, b) => {
  if (a === b) return true;

  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  const isArrayA = isArray(a);
  const isArrayB = isArray(b);
  let ret = false;

  if (isArrayA && isArrayB) {
    ret = a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
  }

  if (a instanceof Date && b instanceof Date) {
    ret = a.getTime() === b.getTime();
  }

  if (isObjectA && isObjectB) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    ret = keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]));
  }

  return ret;
};


function mapFirstArgument(f, map) {
  return (...args) => {
    const arg = args;
    arg[0] = map(arg[0]);
    return f(...arg);
  };
}

function mergeRule(rule1, rule2, mapFunction) {
  const keys = Object.keys(rule2);
  const mappedCopy = {};
  keys.forEach((key) => {
    mappedCopy[key] = mapFirstArgument(rule2[key], mapFunction);
  });
  return {
    ...rule1,
    ...mappedCopy,
    type: val => rule1.type(val) && rule2.type(mapFunction(val)),
  };
}

function flattenObject(ob) {
  const toReturn = {};
  /* eslint-disable */
  for (const i in ob) {
    if (ob[i] && ob[i].constructor === Object) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  /* eslint-enable */
  return toReturn;
}

function arrayContainsAll(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    let contains = false;
    for (let j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        contains = true;
      }
    }
    if (contains === false) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isArray,
  isString,
  isFunction,
  isObject,
  URL_REGEX,
  looseEqual,
  AND,
  OR,
  isInt,
  mapFirstArgument,
  mergeRule,
  flattenObject,
  arrayContainsAll,
};
