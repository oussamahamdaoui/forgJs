
class ErrorCollector {
  constructor() {
    this.errors = [];
  }

  collect(error) {
    this.errors.push(error);
  }

  clear() {
    this.errors = [];
  }

  get() {
    return this.errors.filter(error => error !== null);
  }
}

module.exports = ErrorCollector;
