// Snow Days Calculator JavaScript

class SnowCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('snowHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for snow day results
    this.sarcasticTips = [
      "Snow day probability: Where hope meets meteorological disappointment.",
      "Remember, even if there's a 90% chance of a snow day, your school will be the 10%.",
      "The forecast says 12 inches of snow, but your principal drives a tank.",
      "Snow days: Nature's way of saying 'even education has its limits'.",
      "Your superintendent grew up walking uphill both ways in 3 feet of snow, so good luck with that.",
      "The more homework you have due, the less likely a snow day becomes. It's science.",
      "Snow day calculations are 50% meteorology, 50% wishful thinking.",
      "If you wash your pajamas, put a spoon under your pillow, and flush ice cubes down the toilet, you'll still have school tomorrow.",
      "The probability of a snow day is inversely proportional to how much you want one.",
      "School administrators use a complex formula to determine snow days: (Amount of snow) ÷ (Their personal inconvenience) × (Your desperate hopes) = No snow day."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateSnowDay').addEventListener('click', () => {
      this.calculateSnowDayProbability();
    });
    
    // Clear history button
    document.getElementById('clearSnowHistory').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // History item click to show details
    this.historyListElement.addEventListener('click', (event) => {
      const historyItem = event.target.closest('.history-item');
      if (historyItem) {
        // Could implement a feature to restore calculation inputs from history
        console.log('History item clicked:', historyItem);
      }
    });
  }
  
  calculateSnowDayProbability() {
    // Get input values
    const temperature = parseFloat(document.getElementById('currentTemp').value);
    const snowfall = parseFloat(document.getElementById('snowfallAmount').value);
    const windSpeed = parseFloat(document.getElementById('windSpeed').value);
    const schoolDistrict = document.getElementById('schoolDistrict').value;
    const previousSnowDays = parseInt(document.getElementById('previousSnowDays').value);
    
    // Validate inputs
    if (isNaN(temperature) || isNaN(snowfall) || isNaN(windSpeed) || isNaN(previousSnowDays)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate base probability based on snowfall
    let probability = 0;
    if (snowfall < 1) {
      probability = snowfall * 10; // 0-10% for <1 inch
    } else if (snowfall < 3) {
      probability = 10 + (snowfall - 1) * 15; // 10-40% for 1-3 inches
    } else if (snowfall < 6) {
      probability = 40 + (snowfall - 3) * 10; // 40-70% for 3-6 inches
    } else if (snowfall < 12) {
      probability = 70 + (snowfall - 6) * 3; // 70-88% for 6-12 inches
    } else {
      probability = 88 + Math.min(12, (snowfall - 12)) * 1; // 88-100% for >12 inches, max at 24 inches
    }
    
    // Temperature adjustment (colder = higher probability)
    if (temperature > 32) {
      probability *= 0.5; // Above freezing cuts probability in half
    } else if (temperature > 25) {
      probability *= 0.8; // 25-32°F slight reduction
    } else if (temperature < 15) {
      probability = Math.min(100, probability * 1.2); // Below 15°F increases probability
    }
    
    // Wind speed adjustment (higher wind = higher probability)
    if (windSpeed > 20) {
      probability = Math.min(100, probability * 1.3); // High wind increases probability
    } else if (windSpeed > 10) {
      probability = Math.min(100, probability * 1.1); // Moderate wind slight increase
    }
    
    // School district adjustment
    switch (schoolDistrict) {
      case 'urban':
        probability *= 0.8; // Urban districts less likely to cancel
        break;
      case 'rural':
        probability = Math.min(100, probability * 1.2); // Rural districts more likely to cancel
        break;
      // Suburban is default, no adjustment
    }
    
    // Previous snow days adjustment (more previous days = less likely to get another)
    if (previousSnowDays > 5) {
      probability *= 0.7; // Significant reduction if many days already used
    } else if (previousSnowDays > 2) {
      probability *= 0.9; // Slight reduction
    }
    
    // Final probability (rounded to nearest whole number)
    probability = Math.round(Math.max(0, Math.min(100, probability)));
    
    // Update probability display
    document.getElementById('snowProbability').textContent = `${probability}%`;
    
    // Update probability marker
    document.getElementById('probabilityMarker').style.left = `${probability}%`;
    
    // Update description based on probability
    let description = '';
    if (probability < 20) {
      description = "Don't get your hopes up. You're definitely going to school tomorrow.";
    } else if (probability < 40) {
      description = "There's a chance, but I wouldn't start celebrating yet.";
    } else if (probability < 60) {
      description = "It could go either way. Maybe do half your homework?";
    } else if (probability < 80) {
      description = "Looking good! Might want to charge your gaming devices.";
    } else {
      description = "Almost certain! Time to plan your day of doing absolutely nothing productive.";
    }
    document.getElementById('snowDescription').textContent = description;
    
    // Add to history
    const calculationString = `${snowfall}" snow, ${temperature}°F, ${windSpeed}mph wind, ${schoolDistrict} district`;
    const result = `${probability}% chance of snow day`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('snowTip');
    
    if (tipElement) {
      tipElement.textContent = this.sarcasticTips[randomIndex];
      
      // Add fade-in animation
      tipElement.classList.remove('fade-in');
      void tipElement.offsetWidth; // Trigger reflow
      tipElement.classList.add('fade-in');
    }
  }
  
  // History methods
  addToHistory(calculation, result) {
    this.history.addEntry(calculation, result);
    this.renderHistoryList();
  }
  
  clearHistory() {
    this.history.clear();
    this.renderHistoryList();
  }
  
  renderHistoryList() {
    // Clear current history list
    this.historyListElement.innerHTML = '';
    
    // Get history entries
    const entries = this.history.getEntries();
    
    if (entries.length === 0) {
      const emptyMessage = document.createElement('div');
      emptyMessage.className = 'history-item';
      emptyMessage.innerHTML = '<div class="history-calculation">No calculations yet</div>';
      this.historyListElement.appendChild(emptyMessage);
      return;
    }
    
    // Create and append history items
    entries.forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      const calculationElement = document.createElement('div');
      calculationElement.className = 'history-calculation';
      calculationElement.textContent = entry.calculation;
      
      const resultElement = document.createElement('div');
      resultElement.className = 'history-result';
      resultElement.textContent = entry.result;
      
      const timestampElement = document.createElement('div');
      timestampElement.className = 'history-timestamp';
      timestampElement.textContent = this.formatTimestamp(entry.timestamp);
      
      historyItem.appendChild(calculationElement);
      historyItem.appendChild(resultElement);
      historyItem.appendChild(timestampElement);
      
      this.historyListElement.appendChild(historyItem);
    });
  }
  
  formatTimestamp(timestamp) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize snow calculator when hub.js loads the snow calculator
document.addEventListener('DOMContentLoaded', () => {
  // The snow calculator will be initialized when selected in the hub
  window.snowCalculator = new SnowCalculator();
});
