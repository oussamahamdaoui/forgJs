const { traverse, getValFromPath } = require('./util');

class Validator {
  constructor(o) {
    this.rules = o;
  }

  test(o) {
    let ret = true;
    traverse(this.rules, (val, path) => {
      if (val.test(getValFromPath(path, o), o) === false) {
        ret = false;
      }
    });
    return ret;
  }
}

module.exports = Validator;
