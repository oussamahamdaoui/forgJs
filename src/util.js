const isArray = arr => Array.isArray(arr);

const isString = str => typeof str === 'string' || str instanceof String;

const isInt = val => Number.isInteger(val);

const URL_REGEX = /^\(?(?:(http|https|ftp):\/\/)?(?:((?:[^\W\s]|\.|-|[:]{1})+)@{1})?((?:www.)?(?:[^\W\s]|\.|-)+[\.][^\W\s]{2,4}|localhost(?=\/)|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})(?::(\d*))?([\/]?[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]]*))?([\#][^\s\n]*)?\)?/; // eslint-disable-line

const isObject = obj => obj !== null && typeof obj === 'object';

const AND = (v1, v2) => v1 && v2;
const OR = (v1, v2) => v1 || v2;

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

module.exports = {
  isArray,
  isString,
  URL_REGEX,
  looseEqual,
  AND,
  OR,
  isInt,
  mapFirstArgument,
  mergeRule,
};
