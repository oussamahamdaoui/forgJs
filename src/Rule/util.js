const { isFunction } = require('./../util');

function getErrorFromFunctionOrString(error, path, value) {
  if (isFunction(error)) {
    return error(path, value);
  }
  return error;
}

function getErrorFromObject(error, path, value) {
  if (!Object.prototype.hasOwnProperty.call(error, path)) {
    return null; // Here should be the default error message.
  }
  return getErrorFromFunctionOrString(error, path, value);
}

module.exports = { getErrorFromObject, getErrorFromFunctionOrString };
