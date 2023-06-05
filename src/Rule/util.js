const { isFunction } = require('./../util');

/**
 * If the error is function, calls this function with two arguments: path and value
 * and returns the result. If error is string, just returns it.
 *
 * @param {Function|string} error representation of error
 * @param {string} path
 * @param {any} value
 * @returns {String}
 */
const getErrorFromFunctionOrString = (error, path, value) => {
  if (isFunction(error)) {
    return error(path, value);
  }
  return error;
};

/**
 * Returns error message for error. If error does not have any property
 * named key, returns default error message.
 *
 * @param {Object} error object error
 * @param {any} path
 * @param {any} value
 * @param {String} key name of error's property which value is error message
 * @returns {String}
 */
const getErrorFromObject = (error, path, value, key) => {
  if (!error[key]) {
    return `${path} doesn't satisfy the ${key} rule`; // Here should be the default error message.
  }
  return getErrorFromFunctionOrString(error[key], path, value);
};

module.exports = { getErrorFromObject, getErrorFromFunctionOrString };
