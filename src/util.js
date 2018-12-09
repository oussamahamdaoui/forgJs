const isArray = arr => Array.isArray(arr);

const isString = str => typeof str === 'string' || str instanceof String;

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

  if (isArrayA && isArrayB) {
    return a.length === b.length && a.every((e, i) => looseEqual(e, b[i]));
  }

  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  if (isObjectA && isObjectB) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    return keysA.length === keysB.length && keysA.every(key => looseEqual(a[key], b[key]));
  }

  return false;
};


module.exports = {
  isArray,
  isString,
  URL_REGEX,
  looseEqual,
  AND,
  OR,
};
