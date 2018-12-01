const { TEST_FUNCTIONS, OPTIONAL } = require('../testFunctions');

class Rule {
  constructor(obj, hole) {
    if (typeof obj === 'string' || obj instanceof String) {
      this.rule = { type: obj };
    } else {
      this.rule = obj;
    }
    this.hole = hole;
    this.testEntryObject();
  }

  test(val, obj) {
    if (Rule.TEST_FUNCTIONS[this.rule.type].optional(val, this.rule.optional, obj) === true) {
      return true;
    }

    const keys = Object.keys(this.rule);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const testFunction = Rule.TEST_FUNCTIONS[this.rule.type][key];

      if (testFunction(val, this.rule[key], obj) === false && testFunction !== OPTIONAL) {
        return false;
      }
    }
    return true;
  }

  testEntryObject() {
    const keys = Object.keys(this.rule);
    if (!this.rule.type) {
      throw Error('`type` is required');
    }
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (!Rule.TEST_FUNCTIONS[this.rule.type]) {
        throw Error(`The \`${this.rule.type}\` type doesn't exist`);
      }
      if (!Rule.TEST_FUNCTIONS[this.rule.type][key]) {
        throw new Error(`\`${this.rule.type}\` doesn't have "${key}" test!`);
      }
    }
  }

  static addCustom(name, rule) {
    Rule.TEST_FUNCTIONS[name] = rule;
    Rule.TEST_FUNCTIONS[name].optional = OPTIONAL;
  }
}

Rule.TEST_FUNCTIONS = TEST_FUNCTIONS;

module.exports = Rule;
