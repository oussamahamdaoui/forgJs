/**
 * This object collects errors into array
 * @class
 */
class ErrorCollector {
  /**
   * Initializes empty ErrorCollector
   * @constructor
   */
  constructor() {
    this.errors = [];
  }

  /**
   * Adds error to collection
   *
   * @param {error} error error added to collection
   */
  collect(error) {
    this.errors.push(error);
  }

  /**
   * Removes all errors from this ErrorCollector
   */
  clear() {
    this.errors = [];
  }

  /**
   * Returns all collected errors
   *
   * @returns {array}
   */
  get() {
    return this.errors.filter(error => error !== null);
  }
}

module.exports = ErrorCollector;
