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
