const { isFunction } = require('./../util');

/**
 * If the error is function, calls this function with two arguments: path and value
 * and returns the result. If error is string, just returns it.
 *
 * @param {Function|String} error representation of error
 * @param {any} path
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
  if (!Object.prototype.hasOwnProperty.call(error, key)) {
    return null; // Here should be the default error message.
  }
  return getErrorFromFunctionOrString(error[key], path, value);
};

module.exports = { getErrorFromObject, getErrorFromFunctionOrString };
