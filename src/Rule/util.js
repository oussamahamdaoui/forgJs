const { isFunction } = require('./../util');

const getErrorFromFunctionOrString = (error, path, value) => {
  if (isFunction(error)) {
    return error(path, value);
  }
  return error;
};

const getErrorFromObject = (error, path, value, key) => {
  if (!Object.prototype.hasOwnProperty.call(error, key)) {
    return null; // Here should be the default error message.
  }
  return getErrorFromFunctionOrString(error[key], path, value);
};

module.exports = { getErrorFromObject, getErrorFromFunctionOrString };
