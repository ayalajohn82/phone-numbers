const _ = require('lowdash');

module.exports = class State {
  constructor() {
    this._total = 0;
    this._unique = 0;
    this._duplicates = 0;
    this._pNumbers = {};
  }

  getState() {
    return {
      total: this._total,
      unique: this._unique,
      duplicates: this._duplicates,
    }
  }
  
  incrementTotalAndUnique() {
    this._total += 1;
    this._unique += 1;
  }

  incrementDuplicates() {
    this._duplicates += 1;
  }

  resetTemp() {
    this._unique = 0;
    this._duplicates = 0;
  }

  isDuplicateNumber(number) {
    if(this._pNumbers.hasOwnProperty(number)) {
      return true;
    } else {
      this._pNumbers[number] = number;
      return false;
    }
  }
}