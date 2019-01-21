const {
  traverse, getValFromPath,
} = require('./util');

const { unexpectedFiled } = require('../const');
const {
  flattenObject, arrayContainsAll,
} = require('../util');

class Validator {
  constructor(o) {
    this.rules = o;
  }

  test(o) {
    let ret = true;
    const keysOfRules = Object.keys(flattenObject(this.rules));
    const keysOfObject = Object.keys(flattenObject(o));

    if (!arrayContainsAll(keysOfObject, keysOfRules)) {
      return false;
    }

    traverse(this.rules, (rule, path) => {
      if (rule.test(getValFromPath(path, o), o) === false) {
        ret = false;
      }
    });
    return ret;
  }

  testAll(arr) {
    for (let i = 0; i < arr.length; i += 1) {
      if (this.test(arr[i]) === false) {
        return i;
      }
    }
    return -1;
  }

  getErrors(o) {
    let errors = [];
    const keysOfRules = Object.keys(flattenObject(this.rules));
    const keysOfObject = Object.keys(flattenObject(o));

    if (!arrayContainsAll(keysOfObject, keysOfRules)) {
      let undeclaredFiledes = keysOfObject.filter(i => keysOfRules.indexOf(i) < 0);
      undeclaredFiledes = undeclaredFiledes.map(unexpectedFiled);
      errors = [...errors, ...undeclaredFiledes];
    }

    traverse(this.rules, (rule, path) => {
      if (rule.test(getValFromPath(path, o), o, path) === false) {
        errors = [
          ...errors,
          ...rule.errorCollector.get(),
        ];
      }
    });
    return errors;
  }
}

module.exports = Validator;
