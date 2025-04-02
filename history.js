// Add calculation history functionality to the calculator

class CalculationHistory {
  constructor(maxEntries = 10) {
    this.history = [];
    this.maxEntries = maxEntries;
  }
  
  addEntry(calculation, result) {
    // Add new entry at the beginning of the array
    this.history.unshift({
      calculation: calculation,
      result: result,
      timestamp: new Date()
    });
    
    // Keep history within max size
    if (this.history.length > this.maxEntries) {
      this.history.pop();
    }
  }
  
  getEntries() {
    return this.history;
  }
  
  clear() {
    this.history = [];
  }
}

// Export the class
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CalculationHistory;
}
