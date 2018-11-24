var TEST_FUNCTIONS = require('./testfunctions');

class Rule {
  constructor(obj, hole){
    this.rule = obj;
    this.hole = hole;
  }
  
  test(val) {
    let ret = true
    for(let key in this.rule){
      if(!TEST_FUNCTIONS[this.rule.type]){
        throw Error(`The ${this.rule.type} type doesn't exist`)
      }
      if(!TEST_FUNCTIONS[this.rule.type][key]){
        throw new Error(`${this.rule.type} doesn't have "${key}" test!`);
      }
      if(TEST_FUNCTIONS[this.rule.type][key](val, this.rule[key]) === false){
        ret = false;
      }
    }
    return ret;
  }

}

function traverse(o, fn, path) {
  path = path ? path :"";

  for (var i in o) {
    if (o[i] !== null && typeof(o[i]) == "object" && !(o[i] instanceof Rule)  ) {
      traverse(o[i], fn,  `${path}.${i}`);
    }
    else {
      fn.apply(null,[o[i], `${path}.${i}`.substr(1)]);
      path = "";
    }
  }
}


function getValFromPath(path, obj){ 
  path = path.split('.');
  if(path.length === 1){
    return obj[path[0]];
  }
  else{
    const key = path.shift();
    return getValFromPath(path.join('.'),obj[key]);
  }
}

class Validator {
  constructor(o){
    this.rules = o;
  }

  test(o){
    let ret = true
    traverse(this.rules, (val, path)=>{
      if(val.test(getValFromPath(path, o)) === false){
        ret =  false;
      }
    })
    return ret;
  }
}

module.exports =  {Validator, Rule};