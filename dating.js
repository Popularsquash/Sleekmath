// JavaScript for Dating Compatibility Calculator

class DatingCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('datingHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for dating results
    this.sarcasticTips = [
      "Love is just a chemical reaction that compels animals to breed. Rise above. Focus on science.",
      "Dating is just interviewing someone for the position of future ex.",
      "Relationships are like algebra: have you ever looked at your X and wondered Y?",
      "The best relationships start when you're not desperate to be in one... so you're already doomed.",
      "True love is finding someone whose weirdness is compatible with yours.",
      "Dating is like a math equation where you try to solve for X. Unfortunately, X never texts back.",
      "Statistically speaking, there are billions of people you won't end up with. This calculator just helps narrow it down.",
      "Remember, it's not 'ghosting' if you both pretend the date never happened.",
      "The secret to a long relationship is finding someone who's willing to put up with your nonsense.",
      "Dating is a numbers game. Unfortunately, your numbers aren't looking too good."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateDating').addEventListener('click', () => {
      this.calculateCompatibility();
    });
    
    // Desperation slider
    const desperationSlider = document.getElementById('desperationSlider');
    const desperationValue = document.getElementById('desperationValue');
    desperationSlider.addEventListener('input', () => {
      desperationValue.textContent = desperationSlider.value;
    });
    
    // Clear history button
    document.getElementById('clearDatingHistory').addEventListener('click', () => {
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
  
  calculateCompatibility() {
    // Get input values
    const yourName = document.getElementById('yourName').value.trim();
    const crushName = document.getElementById('crushName').value.trim();
    const desperation = parseInt(document.getElementById('desperationSlider').value);
    const sharedInterests = document.getElementById('sharedInterests').checked;
    const textingHabit = document.getElementById('textingHabit').checked;
    const friendsApproval = document.getElementById('friendsApproval').checked;
    const attractiveness = document.getElementById('attractiveness').checked;
    const zodiacCompatibility = document.getElementById('zodiacCompatibility').value;
    
    // Validate inputs
    if (!yourName || !crushName) {
      alert('Please enter both names to calculate compatibility.');
      return;
    }
    
    // Calculate base compatibility using name length (completely arbitrary and humorous)
    let compatibility = 0;
    
    // Name-based calculation (completely pseudoscientific)
    const nameSum = (yourName.length + crushName.length) % 10;
    compatibility += nameSum * 3;
    
    // Check for same first letter (adds 10%)
    if (yourName.charAt(0).toLowerCase() === crushName.charAt(0).toLowerCase()) {
      compatibility += 10;
    }
    
    // Desperation adjustment (higher desperation = higher compatibility)
    compatibility += desperation * 2;
    
    // Checkbox adjustments
    if (sharedInterests) compatibility += 15;
    if (textingHabit) compatibility += 10;
    if (friendsApproval) compatibility += 8;
    if (attractiveness) compatibility += 12;
    
    // Zodiac compatibility adjustment
    switch (zodiacCompatibility) {
      case 'high':
        compatibility += 20;
        break;
      case 'medium':
        compatibility += 10;
        break;
      case 'low':
        compatibility -= 5;
        break;
      // 'none' has no adjustment
    }
    
    // Final adjustments and capping
    compatibility = Math.max(1, Math.min(99, compatibility));
    
    // If desperation is very high, add a bonus
    if (desperation >= 8) {
      compatibility = Math.min(99, compatibility + 10);
    }
    
    // Update compatibility display
    document.getElementById('compatibilityScore').textContent = `${compatibility}%`;
    document.getElementById('compatibilityMeter').style.width = `${compatibility}%`;
    
    // Generate compatibility description
    let resultText = '';
    if (compatibility < 30) {
      resultText = `${yourName} and ${crushName} have a compatibility of ${compatibility}%. You'd have better luck dating a houseplant. At least it wouldn't forget your birthday.`;
    } else if (compatibility < 50) {
      resultText = `${yourName} and ${crushName} have a compatibility of ${compatibility}%. It's not the worst match ever, but close. Maybe consider getting a pet instead?`;
    } else if (compatibility < 70) {
      resultText = `${yourName} and ${crushName} have a compatibility of ${compatibility}%. There's potential here, but don't start planning the wedding just yet. Or do, if your desperation level is accurate.`;
    } else if (compatibility < 90) {
      resultText = `${yourName} and ${crushName} have a compatibility of ${compatibility}%. This could actually work! Just don't be yourself too much at first.`;
    } else {
      resultText = `${yourName} and ${crushName} have a compatibility of ${compatibility}%. Wow, you two are practically soulmates! Or this calculator is broken. Probably the latter.`;
    }
    
    document.getElementById('compatibilityResult').textContent = resultText;
    
    // Add to history
    const calculationString = `${yourName} & ${crushName}, Desperation: ${desperation}/10`;
    const result = `${compatibility}% compatible`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('datingTip');
    
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

// Initialize dating calculator when hub.js loads the dating calculator
document.addEventListener('DOMContentLoaded', () => {
  // The dating calculator will be initialized when selected in the hub
  window.datingCalculator = new DatingCalculator();
});
