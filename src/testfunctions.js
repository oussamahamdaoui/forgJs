const TYPE_VALIDATION = (val, key) => {return TYPES[key](val)};
const CUSTOM = (val, f) => {return f(val)};

const TEST_FUNCTIONS = {
  int:{
    min: (val, min) => {return val - min > 0},
    max: (val, max) => {return val - max < 0},
    equal:(val, equal) => {return val === equal},
  },

  string:{
    minLength: (val, min) => {return val.length - min > 0},
    maxLength: (val, max) => {return val.length - max < 0},
    equal:(val, equal) => {return val === equal},
    match: (val, regex) => {return regex.test(val)},
    notEmpty: (val) => {return val !== ""},
  }, 

  date:{
    after: (val, min) => {return val - min > 0},
    before: (val, max) => {return val - max < 0},
    between: (val, range) => {return val - range[0] > 0 && val - range[1] < 0 },
    equal:(val, equal) => {return val - equal === 0},
  },

  float: {
    min: (val, min) => {return val - min > 0},
    max: (val, max) => {return val - max < 0},
    equal:(val, equal) => {return val === equal},
  },

  array:{
    of:(arr, rule)=>{
      let ret = true;
      arr.forEach(el => {
        if(rule.test(el)===false){
          ret = false;
        }
      });
      return ret;
    },
    notEmpty: (val) =>{return val.length !== 0},
    length: (val, len) => {return val.length === len}
  }
}


for(let key in TEST_FUNCTIONS){
  TEST_FUNCTIONS[key].type = TYPE_VALIDATION;
  TEST_FUNCTIONS[key].custom = CUSTOM;
}

TYPES = {
  int: (val) => {return Number.isInteger(val)},
  float: (val) => {return Number(val) === val && val % 1 !== 0},
  date: (val) => {return val instanceof Date },
  string: (val) => {return typeof val === 'string' || val instanceof String},
  array: (val) => {return val instanceof Array}
};

module.exports =  TEST_FUNCTIONS;