const fn = {
  type: val => val && {}.toString.call(val) === '[object Function]',
  result: (val, obj) => obj.toBe.test(val(obj.of)),
};

module.exports = fn;
