const { TEST_FUNCTIONS } = require('./testfunctions');

class Rule {
  constructor(obj, hole) {
    this.rule = obj;
    this.hole = hole;
  }

  test(val, obj) {
    let ret = true;
    Object.keys(this.rule).forEach((key) => {
      if (!Rule.TEST_FUNCTIONS[this.rule.type]) {
        throw Error(`The ${this.rule.type} type doesn't exist`);
      }
      if (!Rule.TEST_FUNCTIONS[this.rule.type][key]) {
        throw new Error(`${this.rule.type} doesn't have "${key}" test!`);
      }
      if (Rule.TEST_FUNCTIONS[this.rule.type][key](val, this.rule[key], obj) === false) {
        ret = false;
      }
    });
    return ret;
  }

  static addCustom(name, rule) {
    Rule.TEST_FUNCTIONS[name] = rule;
  }
}

Rule.TEST_FUNCTIONS = TEST_FUNCTIONS;

module.exports = Rule;
