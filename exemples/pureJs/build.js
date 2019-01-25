(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const { Rule } = require('../../src');

hljs.initHighlightingOnLoad(); // eslint-disable-line
hljs.initLineNumbersOnLoad(); // eslint-disable-line


const $ = a => document.querySelectorAll(a); // eslint-disable-line

$('pre code').forEach((block) => {
  hljs.lineNumbersBlock(block); // eslint-disable-line
});

const PhoneNumber = new Rule({
  type: 'string-int',
  minLength: 10,
  maxLength: 10,
  match: /0(7|6).*/,
});

const email = new Rule({
  type: 'email',
  domain: d => ['hotmail', 'outlook', 'gmail'].indexOf(d) !== -1,
});

const password = new Rule({
  type: 'password',
  minLength: 8,
  maxLength: 10,
  matchesOneOf: ['@', '_', '-', '.', '?', '$'],
  numbers: 1,
  uppercase: 1,
});

const url = new Rule({
  type: 'url',
  domain: domain => domain === 'github.com',
  protocol: protocol => protocol === 'https',
});

const country = new Rule({
  type: 'string',
  oneOf: ['FR', 'US', 'EN'],
});
const zipcode = new Rule({
  type: 'string-int',
  minLength: 5,
  maxLength: 5,
});

const street = new Rule({
  type: 'string',
  notEmpty: true,
});

const streetNumber = new Rule({
  type: 'string-int',
});

const rules = {
  'phone-number': PhoneNumber,
  password,
  email,
  url,
  zipcode,
  street,
  'street-number': streetNumber,
  country,

};


$('*[data-type]').forEach((e) => {
  e.addEventListener('keyup', (evt) => {
    const elem = evt.target;
    const { type } = elem.dataset;
    if (!rules[type]) {
      return;
    }
    if (!rules[type].test(elem.value)) {
      elem.classList.add('err');
      elem.classList.remove('valid');
    } else {
      elem.classList.remove('err');
      elem.classList.add('valid');
    }
  });
});

},{"../../src":8}],2:[function(require,module,exports){

class ErrorCollector {
  constructor() {
    this.errors = [];
  }

  collect(error) {
    this.errors.push(error);
  }

  clear() {
    this.errors = [];
  }

  get() {
    return this.errors.filter(error => error !== null);
  }
}

module.exports = ErrorCollector;

},{}],3:[function(require,module,exports){
const ErrorCollector = require('./ErrorCollector');
const { getErrorFromObject, getErrorFromFunctionOrString } = require('./util');
const { TEST_FUNCTIONS, OPTIONAL } = require('../testFunctions');
const { AND, OR, isObject } = require('./../util');

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
    this.errorCollector = new ErrorCollector();
    this.testEntryObject();
  }

  test(val, obj, path) {
    this.errorCollector.clear();
    const types = this.getTypes();
    const operators = this.getRuleOperators();
    let ret = this.testOneRule(val, obj, types[0], path);

    for (let i = 1; i < types.length; i += 1) {
      const operator = operators[i] || operators[i - 1];
      ret = operator(ret, this.testOneRule(val, obj, types[i], path));
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

  testOneRule(val, obj, type, path) {
    if (Rule.TEST_FUNCTIONS[type].optional(val, this.rule.optional, obj) === true) {
      return true;
    }
    const keys = Object.keys(this.rule);
    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      const testFunction = Rule.TEST_FUNCTIONS[type][key];

      if (testFunction(val, this.rule[key], obj) === false && testFunction !== OPTIONAL) {
        this.errorCollector.collect(this.getError(path, val, key));
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

  getError(path, value, key) {
    if (isObject(this.error)) {
      return getErrorFromObject(this.error, path, value, key);
    }
    return getErrorFromFunctionOrString(this.error, path, value);
  }

  static addCustom(name, rule) {
    Rule.TEST_FUNCTIONS[name] = rule;
    Rule.TEST_FUNCTIONS[name].optional = OPTIONAL;
  }
}

Rule.TEST_FUNCTIONS = TEST_FUNCTIONS;

module.exports = Rule;

},{"../testFunctions":9,"./../util":27,"./ErrorCollector":2,"./util":4}],4:[function(require,module,exports){
const { isFunction } = require('./../util');

function getErrorFromFunctionOrString(error, path, value) {
  if (isFunction(error)) {
    return error(path, value);
  }
  return error;
}

function getErrorFromObject(error, path, value, key) {
  if (!Object.prototype.hasOwnProperty.call(error, key)) {
    return null; // Here should be the default error message.
  }
  return getErrorFromFunctionOrString(error[key], path, value);
}

module.exports = { getErrorFromObject, getErrorFromFunctionOrString };

},{"./../util":27}],5:[function(require,module,exports){
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

},{"../const":7,"../util":27,"./util":6}],6:[function(require,module,exports){
const Rule = require('../Rule');

function traverse(o, fn, p) {
  let path = p || '';

  Object.keys(o).forEach((i) => {
    if (o[i] !== null && typeof (o[i]) === 'object' && !(o[i] instanceof Rule)) {
      traverse(o[i], fn, `${path}.${i}`);
    } else {
      fn.apply(null, [o[i], `${path}.${i}`.substr(1)]);
      path = '';
    }
  });
}


function getValFromPath(p, obj) {
  const path = p.split('.');
  if (path.length === 1) {
    return obj[path[0]];
  }

  const key = path.shift();
  return getValFromPath(path.join('.'), obj[key]);
}

module.exports = { getValFromPath, traverse };

},{"../Rule":3}],7:[function(require,module,exports){
const unexpectedFiled = filed => `${filed} is unexpcted`;
module.exports = {
  unexpectedFiled,
};

},{}],8:[function(require,module,exports){
const Validator = require('./Validator');
const Rule = require('./Rule');

module.exports = { Validator, Rule };

},{"./Rule":3,"./Validator":5}],9:[function(require,module,exports){
const { looseEqual } = require('../util');
const types = require('./types');

const CUSTOM = (val, f, obj) => f(val, obj);
const OPTIONAL = (val, state) => val === undefined && state === true;
const oneOf = (val, arr) => {
  for (let i = 0; i < arr.length; i += 1) {
    if (looseEqual(arr[i], val)) {
      return true;
    }
  }
  return false;
};

const TEST_FUNCTIONS = {
  ...types,
};
Object.keys(TEST_FUNCTIONS).forEach((key) => {
  TEST_FUNCTIONS[key].custom = CUSTOM;
  TEST_FUNCTIONS[key].optional = OPTIONAL;
  TEST_FUNCTIONS[key].oneOf = oneOf;
});

module.exports = { TEST_FUNCTIONS, OPTIONAL };

},{"../util":27,"./types":17}],10:[function(require,module,exports){
const {
  isString,
} = require('../util');

const NUMBER = {
  min: (val, min) => val - min >= 0,
  max: (val, max) => val - max <= 0,
  equal: (val, equal) => val === equal,
  type: val => Number(val) === val,
};

const STRING = {
  minLength: (val, min) => val.length - min >= 0,
  maxLength: (val, max) => val.length - max <= 0,
  equal: (val, equal) => val === equal,
  match: (val, regex) => regex.test(val),
  notEmpty: val => val !== '',
  type: isString,
};

const BOOLEAN = {
  type: val => val === true || val === false,
  toBe: (val, bool) => val === bool,
};

module.exports = {
  BOOLEAN,
  STRING,
  NUMBER,
};

},{"../util":27}],11:[function(require,module,exports){
const { isArray } = require('../../util');

const array = {
  of: (arr, rule) => {
    let ret = true;
    arr.forEach((el) => {
      if (rule.test(el) === false) {
        ret = false;
      }
    });
    return ret;
  },
  notEmpty: val => val.length !== 0,
  length: (val, len) => val.length === len,
  type: isArray,
};

module.exports = array;

},{"../../util":27}],12:[function(require,module,exports){
const { BOOLEAN } = require('../primitives');

const boolean = {
  ...BOOLEAN,
};

module.exports = boolean;

},{"../primitives":10}],13:[function(require,module,exports){
const date = {
  after: (val, min) => val - min > 0,
  before: (val, max) => val - max < 0,
  between: (val, range) => val - range[0] > 0 && val - range[1] < 0,
  equal: (val, equal) => val - equal === 0,
  type: val => val instanceof Date,
};

module.exports = date;

},{}],14:[function(require,module,exports){
const { STRING } = require('../primitives');
const { isString } = require('../../util');

const email = {
  ...STRING,
  type: val => isString(val) && /\S+@\S+\.\S+/.test(val),
  user: (val, f) => f(val.match(/(\S+)@\S+\.\S+/)[1]),
  domain: (val, f) => f(val.match(/\S+@(\S+)\.\S+/)[1]),

};
module.exports = email;

},{"../../util":27,"../primitives":10}],15:[function(require,module,exports){
const { NUMBER } = require('../primitives');

const float = {
  ...NUMBER,
  type: val => Number(val) === val && val % 1 !== 0,
};
module.exports = float;

},{"../primitives":10}],16:[function(require,module,exports){
const fn = {
  type: val => val && {}.toString.call(val) === '[object Function]',
  result: (val, obj) => obj.toBe.test(val(obj.of)),
};

module.exports = fn;

},{}],17:[function(require,module,exports){
const int = require('./int');
const float = require('./float');
const number = require('./number');
const string = require('./string');
const password = require('./password');
const email = require('./email');
const url = require('./url');
const boolean = require('./boolean');
const date = require('./date');
const array = require('./array');
const func = require('./function');
const stringInt = require('./string-int');
const stringFloat = require('./string-float');
const stringDate = require('./string-date');
const stringBoolean = require('./string-boolean');


module.exports = {
  int,
  float,
  number,
  string,
  password,
  email,
  url,
  boolean,
  date,
  array,
  function: func,
  'string-int': stringInt,
  'string-float': stringFloat,
  'string-date': stringDate,
  'string-boolean': stringBoolean,

};

},{"./array":11,"./boolean":12,"./date":13,"./email":14,"./float":15,"./function":16,"./int":18,"./number":19,"./password":20,"./string":25,"./string-boolean":21,"./string-date":22,"./string-float":23,"./string-int":24,"./url":26}],18:[function(require,module,exports){
const { NUMBER } = require('../primitives');
const { isInt } = require('../../util');

const int = {
  ...NUMBER,
  type: isInt,
};
module.exports = int;

},{"../../util":27,"../primitives":10}],19:[function(require,module,exports){
const { NUMBER } = require('../primitives');

const number = {
  ...NUMBER,
};
module.exports = number;

},{"../primitives":10}],20:[function(require,module,exports){
const { STRING } = require('../primitives');

const password = {
  ...STRING,
  numbers: (val, number) => !!val.match(/(\d)/g) && val.match(/(\d)/g).length >= number,
  uppercase: (val, number) => !!val.match(/([A-Z])/g) && val.match(/([A-Z])/g).length >= number,
  specialChars: (val, number) => !!val.match(/([^a-zA-Z])/g) && val.match(/([^a-zA-Z])/g).length >= number,
  matchesOneOf: (val, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (val.indexOf(arr[i]) !== -1) {
        return true;
      }
    }
    return false;
  },

  matchesAllOf: (val, arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (val.indexOf(arr[i]) === -1) {
        return false;
      }
    }
    return true;
  },
};
module.exports = password;

},{"../primitives":10}],21:[function(require,module,exports){
const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const boolean = require('./boolean');

const castBoolean = (val) => {
  if (val === 'true') return true;
  if (val === 'false') return false;
  return 'a';
};

module.exports = mergeRule(STRING, boolean, castBoolean);

},{"../../util":27,"../primitives":10,"./boolean":12}],22:[function(require,module,exports){
const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const date = require('./date');


module.exports = mergeRule(STRING, date, val => new Date(val));

},{"../../util":27,"../primitives":10,"./date":13}],23:[function(require,module,exports){
const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const float = require('./float');


module.exports = mergeRule(STRING, float, val => Number(val));

},{"../../util":27,"../primitives":10,"./float":15}],24:[function(require,module,exports){
const { STRING } = require('../primitives');
const { mergeRule } = require('../../util');
const int = require('./int');


module.exports = mergeRule(STRING, int, val => Number(val));

},{"../../util":27,"../primitives":10,"./int":18}],25:[function(require,module,exports){
const { STRING } = require('../primitives');

const string = {
  ...STRING,
};
module.exports = string;

},{"../primitives":10}],26:[function(require,module,exports){
const { STRING } = require('../primitives');
const { isString, URL_REGEX } = require('../../util');


const url = {
  ...STRING,
  type: val => isString(val) && URL_REGEX.test(val),
  domain: (val, f) => f(val.match(URL_REGEX)[3]),
  protocol: (val, f) => f(val.match(URL_REGEX)[1]),
};

module.exports = url;

},{"../../util":27,"../primitives":10}],27:[function(require,module,exports){
const isArray = arr => Array.isArray(arr);

const isString = str => typeof str === 'string' || str instanceof String;

const isInt = val => Number.isInteger(val);

const isFunction = func => func !== null && typeof func === 'function';

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

function flattenObject(ob) {
  const toReturn = {};
  /* eslint-disable */
  for (const i in ob) {
    if (ob[i].constructor === Object) {
      const flatObject = flattenObject(ob[i]);
      for (const x in flatObject) {
        toReturn[`${i}.${x}`] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  /* eslint-enable */
  return toReturn;
}

function arrayContainsAll(a, b) {
  for (let i = 0; i < a.length; i += 1) {
    let contains = false;
    for (let j = 0; j < b.length; j += 1) {
      if (a[i] === b[j]) {
        contains = true;
      }
    }
    if (contains === false) {
      return false;
    }
  }
  return true;
}

module.exports = {
  isArray,
  isString,
  isFunction,
  isObject,
  URL_REGEX,
  looseEqual,
  AND,
  OR,
  isInt,
  mapFirstArgument,
  mergeRule,
  flattenObject,
  arrayContainsAll,
};

},{}]},{},[1]);
