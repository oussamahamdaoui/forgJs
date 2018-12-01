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
