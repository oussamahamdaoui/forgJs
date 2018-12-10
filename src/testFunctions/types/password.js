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
