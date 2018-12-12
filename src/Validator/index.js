const { traverse, getValFromPath } = require('./util');

class Validator {
  constructor(o) {
    this.rules = o;
  }

  test(o) {
    let ret = true;
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
    const errors = [];
    traverse(this.rules, (rule, path) => {
      if (rule.test(getValFromPath(path, o), o) === false) {
        errors.push(rule.getError());
      }
    });
    return errors;
  }
}

module.exports = Validator;
