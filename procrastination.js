// JavaScript for Procrastination Cost Calculator

class ProcrastinationCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('procrastinationHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for procrastination results
    this.sarcasticTips = [
      "Why do today what you can put off until your deadline-induced panic attack?",
      "Procrastination is like a credit card: it's fun until you get the bill.",
      "If you wait until the last minute, it only takes a minute to do.",
      "Nothing makes a person more productive than the last minute.",
      "Procrastination gives you something to look forward to tomorrow.",
      "The sooner you fall behind, the more time you have to catch up.",
      "Hard work often pays off after time, but procrastination always pays off now.",
      "Procrastination is the art of keeping up with yesterday.",
      "You can't just turn on creativity like a faucet. You have to be in the right mood: last-minute panic.",
      "Never put off until tomorrow what you can avoid altogether."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateProcrastination').addEventListener('click', () => {
      this.calculateProcrastinationCost();
    });
    
    // Stress slider
    const stressSlider = document.getElementById('stressSlider');
    const stressValue = document.getElementById('stressValue');
    stressSlider.addEventListener('input', () => {
      stressValue.textContent = stressSlider.value;
    });
    
    // Set default date to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateInput = document.getElementById('taskDeadline');
    if (dateInput) {
      dateInput.valueAsDate = tomorrow;
    }
    
    // Clear history button
    document.getElementById('clearProcrastinationHistory').addEventListener('click', () => {
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
  
  calculateProcrastinationCost() {
    // Get input values
    const taskName = document.getElementById('taskName').value.trim();
    const hourlyRate = parseFloat(document.getElementById('hourlyRate').value);
    const taskDeadline = new Date(document.getElementById('taskDeadline').value);
    const hoursNeeded = parseFloat(document.getElementById('hoursNeeded').value);
    const stressLevel = parseInt(document.getElementById('stressSlider').value);
    const scrollingSocial = document.getElementById('scrollingSocial').checked;
    const watchingVideos = document.getElementById('watchingVideos').checked;
    const cleaningInstead = document.getElementById('cleaningInstead').checked;
    
    // Validate inputs
    if (!taskName) {
      alert('Please enter a task name.');
      return;
    }
    
    if (isNaN(hourlyRate) || hourlyRate <= 0) {
      alert('Please enter a valid hourly rate.');
      return;
    }
    
    if (isNaN(hoursNeeded) || hoursNeeded <= 0) {
      alert('Please enter valid hours needed.');
      return;
    }
    
    if (isNaN(taskDeadline.getTime())) {
      alert('Please enter a valid deadline.');
      return;
    }
    
    // Calculate days until deadline
    const today = new Date();
    const daysUntilDeadline = Math.max(0, Math.ceil((taskDeadline - today) / (1000 * 60 * 60 * 24)));
    
    // Calculate base cost
    let baseCost = hourlyRate * hoursNeeded;
    
    // Calculate procrastination penalty
    let procrastinationPenalty = 0;
    
    // Penalty based on deadline proximity
    if (daysUntilDeadline === 0) {
      procrastinationPenalty += baseCost * 0.5; // 50% penalty for same-day deadline
    } else if (daysUntilDeadline === 1) {
      procrastinationPenalty += baseCost * 0.3; // 30% penalty for next-day deadline
    } else if (daysUntilDeadline <= 3) {
      procrastinationPenalty += baseCost * 0.15; // 15% penalty for 2-3 days deadline
    }
    
    // Penalty based on stress level
    procrastinationPenalty += baseCost * (stressLevel / 20); // 0-50% penalty based on stress
    
    // Penalty for distractions
    if (scrollingSocial) procrastinationPenalty += baseCost * 0.1; // 10% penalty
    if (watchingVideos) procrastinationPenalty += baseCost * 0.15; // 15% penalty
    if (cleaningInstead) procrastinationPenalty += baseCost * 0.05; // 5% penalty
    
    // Calculate total cost
    const totalCost = baseCost + procrastinationPenalty;
    
    // Calculate efficiency loss
    const efficiencyLoss = (procrastinationPenalty / baseCost) * 100;
    
    // Generate analysis text
    let analysis = `Task: "${taskName}"\n\n`;
    analysis += `Base cost: $${baseCost.toFixed(2)} (${hoursNeeded} hours at $${hourlyRate}/hour)\n`;
    analysis += `Procrastination penalty: $${procrastinationPenalty.toFixed(2)}\n`;
    analysis += `Efficiency loss: ${efficiencyLoss.toFixed(0)}%\n\n`;
    
    if (daysUntilDeadline === 0) {
      analysis += "You're cutting it extremely close! The last-minute rush will significantly reduce your efficiency and increase stress.";
    } else if (daysUntilDeadline === 1) {
      analysis += "You still have a day, but you're already facing significant efficiency losses due to procrastination.";
    } else if (daysUntilDeadline <= 3) {
      analysis += "You have a few days, but procrastination is already costing you money and peace of mind.";
    } else {
      analysis += "You have time before the deadline, but procrastination is still adding unnecessary costs.";
    }
    
    // Add distraction-specific analysis
    if (scrollingSocial && watchingVideos && cleaningInstead) {
      analysis += " You're using the procrastination trifecta: social media, videos, AND sudden interest in cleaning. Impressive commitment to avoiding work!";
    } else if (scrollingSocial || watchingVideos || cleaningInstead) {
      analysis += " Your chosen distractions are adding a significant cost to this task.";
    }
    
    // Update display
    document.getElementById('procrastinationCost').textContent = `$${totalCost.toFixed(2)}`;
    document.getElementById('costMeter').style.width = `${Math.min(100, efficiencyLoss)}%`;
    document.getElementById('procrastinationAnalysis').textContent = analysis;
    
    // Add to history
    const calculationString = `"${taskName}" (${hoursNeeded}h @ $${hourlyRate}/h)`;
    const result = `$${totalCost.toFixed(2)} (${efficiencyLoss.toFixed(0)}% loss)`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('procrastinationTip');
    
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

// Initialize procrastination calculator when hub.js loads the procrastination calculator
document.addEventListener('DOMContentLoaded', () => {
  // The procrastination calculator will be initialized when selected in the hub
  window.procrastinationCalculator = new ProcrastinationCalculator();
});
