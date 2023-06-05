const { getErrorFromObject, getErrorFromFunctionOrString } = require('./util');
const { TEST_FUNCTIONS, OPTIONAL } = require('../testFunctions');
const { AND, OR, isObject } = require('./../util');

const OPERATORS = {
  '&': AND,
  '|': OR,
};

/**
 * The Rule class validates only one value
 * once a rule is created it can be used multiple times
 */
class Rule {
  /**
   *
   * @param {String|Object} obj the rule object describes the tests that are ran by the Rule
   * @param {String} error the error returned when the tested input is not correct
   */
  constructor(obj, error) {
    if (typeof obj === 'string') {
      this.rule = { type: obj };
    } else {
      this.rule = obj;
    }
    this.error = error;
    this.testEntryObject();
  }

  /**
   *
   * @param {any} val the value to be tested
   * @param {Object|String} obj the error object or string thats showed on error
   * @param {String} path the path to the tested value this is used when
   * using validator to keep track of the prop value ex: obj.min
   *
   * @return {boolean}
   */

  test(val, path, obj) {
    const types = this.getTypes();
    const operators = this.getRuleOperators();
    let ret = this.testOneRule(val, types[0], path, obj);

    for (let i = 1; i < types.length; i += 1) {
      const operator = operators[i] || operators[i - 1];
      ret = operator(ret, this.testOneRule(val, types[i], path, obj));
    }
    return ret;
  }

  /**
   * converts array from string if multiple types given in type
   * its the case for exemple int|float
   * @private
   * @return {[String]}
   */

  getTypes() {
    return this.rule.type.split(/[&|]/);
  }

  /**
   * Returns a list of the operators when multiple types given
   * its the case for example int|float
   * @private
   * @returns {[String]}
   */
  getRuleOperators() {
    const ret = [];
    const operators = this.rule.type.match(/[&|]/g) || '&';
    for (let i = 0; i < operators.length; i += 1) {
      ret.push(OPERATORS[operators[i]]);
    }
    return ret;
  }

  /**
   * @private
   * @param val value to be tested
   * @param {String} type the type from getTypes()
   * @param {String} path the path to the value if Validator is used
   * @param {any} obj full object beeing tested
   *
   * @returns {boolean}
   */
  testOneRule(val, type, path, obj) {
    if (Rule.TEST_FUNCTIONS[type].optional(val, this.rule.optional) === true) {
      return true;
    }

    const keys = Object.keys(this.rule).sort((key) => {
      if (key === 'type') return -1;
      return 0;
    });

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const testFunction = Rule.TEST_FUNCTIONS[type][key];

      if (testFunction(val, this.rule[key], path, obj) === false && testFunction !== OPTIONAL) {
        return false;
      }
    }
    return true;
  }


  getFailingRules(val) {
    const keys = Object.keys(this.rule).sort((key) => {
      if (key === 'type') return -1;
      return 0;
    });
    return this.getTypes().reduce((acc, type) => {
      if (Rule.TEST_FUNCTIONS[type].optional(val, this.rule.optional) === true) {
        return acc;
      }

      for (let i = 0; i < keys.length; i += 1) {
        const key = keys[i];
        const testFunction = Rule.TEST_FUNCTIONS[type][key];

        if (testFunction(val, this.rule[key]) === false && testFunction !== OPTIONAL) {
          acc.push(key);
          break;
        }
      }
      return acc;
    }, []);
  }

  /**
   * Tests the validity of the constructor object
   * thows an error if the object is invalid
   */

  testEntryObject() {
    if (!this.rule.type) {
      throw Error('`type` is required');
    }
    const types = this.getTypes();
    types.forEach((type) => {
      this.testEntryObjectOneType(type);
    });
  }

  /**
   * Tests the validity of the constructor object
   * thows an error if the object is invalid
   * tests if all the keys are valid
   */

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

  /**
   * returns a list of errors if they are present
   * @return {[String]}
   */

  getError(path, value) {
    if (isObject(this.error)) {
      return this.getFailingRules(value)
        .map(key => getErrorFromObject(this.error, path, value, key));
    }
    return [getErrorFromFunctionOrString(this.error, path, value)];
  }

  /**
   * Add custom rule to the Rule class
   * @param {String} name the name of the rule
   * @param {Function} rule the validation function
   */
  static addCustom(name, rule) {
    Rule.TEST_FUNCTIONS[name] = rule;
    Rule.TEST_FUNCTIONS[name].optional = OPTIONAL;
  }
}

Rule.TEST_FUNCTIONS = TEST_FUNCTIONS;

module.exports = Rule;
