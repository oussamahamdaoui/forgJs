
class ErrorCollector {
  constructor() {
    this.errors = [];
  }

  collect(error) {
    if (this.errors.indexOf(error) >= 0) {
      return;
    }
    this.errors.push(error);
  }

  clear() {
    this.errors = [];
  }

  get() {
    return this.errors;
  }
}

module.exports = ErrorCollector;
