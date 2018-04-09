class State {
  constructor() {
    let total = 0;
    let unique = 0;
    let duplicates = 0;
  }

  getState() {
    return {
      total: this.total,
      unique: this.unique,
      duplicates: this.duplicates,
    }
  }
  
  incrementTotalAndUnique() {
    this.total += 1;
    this.unique += 1;
  }

  incrementDuplicates() {
    this.duplicates += 1;
  }

  resetTemp() {
    this.unique = 0;
    this.duplicates = 0;
  }
}

export { State as default }