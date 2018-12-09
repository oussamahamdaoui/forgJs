const { TEST_FUNCTIONS, OPTIONAL } = require('../testFunctions');
const { AND, OR } = require('./../util');

const OPERATORS = {
  '&': AND,
  '|': OR,
};

class Rule {
  constructor(obj, error) {
    if (typeof obj === 'string' || obj instanceof String) {
      this.rule = { type: obj };
    } else {
      this.rule = obj;
    }
    this.error = error;
    this.testEntryObject();
  }

  test(val, obj) {
    const types = this.getTypes();
    const operators = this.getRuleOperators();
    let ret = this.testOneRule(val, obj, types[0]);

    for (let i = 1; i < types.length; i += 1) {
      const operator = operators[i] || operators[i - 1];
      ret = operator(ret, this.testOneRule(val, obj, types[i]));
    }
    return ret;
  }

  getTypes() {
    return this.rule.type.split(/[&|]/);
  }

  getRuleOperators() {
    const ret = [];
    const operators = this.rule.type.match(/[&|]/g) || '&';
    for (let i = 0; i < operators.length; i += 1) {
      ret.push(OPERATORS[operators[i]]);
    }
    return ret;
  }

  testOneRule(val, obj, type) {
    if (Rule.TEST_FUNCTIONS[type].optional(val, this.rule.optional, obj) === true) {
      return true;
    }
    const keys = Object.keys(this.rule);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const testFunction = Rule.TEST_FUNCTIONS[type][key];

      if (testFunction(val, this.rule[key], obj) === false && testFunction !== OPTIONAL) {
        return false;
      }
    }
    return true;
  }

  testEntryObject() {
    if (!this.rule.type) {
      throw Error('`type` is required');
    }
    const types = this.getTypes();
    types.forEach((type) => {
      this.testEntryObjectOneType(type);
    });
  }

  testEntryObjectOneType(type) {
    const keys = Object.keys(this.rule);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (!Rule.TEST_FUNCTIONS[type]) {
        throw Error(`The \`${type}\` type doesn't exist`);
      }
      if (!Rule.TEST_FUNCTIONS[type][key]) {
        throw new Error(`\`${type}\` doesn't have "${key}" test!`);
      }
    }
  }

  getError() {
    return this.error;
  }

  static addCustom(name, rule) {
    Rule.TEST_FUNCTIONS[name] = rule;
    Rule.TEST_FUNCTIONS[name].optional = OPTIONAL;
  }
}

Rule.TEST_FUNCTIONS = TEST_FUNCTIONS;

module.exports = Rule;
