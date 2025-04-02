// REM Sleep Calculator JavaScript

class SleepCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('sleepHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for sleep results
    this.sarcasticTips = [
      "Sleep is just a preview of death that we all look forward to at the end of the day.",
      "The recommended 8 hours of sleep is just Big Mattress propaganda.",
      "Nothing says 'I've given up' like going to bed at a reasonable hour.",
      "Sleep: The only socially acceptable way to avoid people for 8 hours.",
      "Your body needs sleep to function, but your anxiety needs you to stay awake and overthink everything.",
      "Sleep is your body's way of forcing you to stop looking at your phone for a few hours.",
      "REM sleep is when your brain processes the day's events, or in my case, replays embarrassing moments from 2007.",
      "The perfect sleep schedule doesn't exi— *falls asleep at keyboard*",
      "Sleep is nature's way of telling you to stop whatever dumb thing you're doing.",
      "Counting sheep: The original boring content designed to make you fall asleep."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateSleep').addEventListener('click', () => {
      this.calculateSleepCycles();
    });
    
    // Clear history button
    document.getElementById('clearSleepHistory').addEventListener('click', () => {
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
  
  calculateSleepCycles() {
    // Get input values
    const wakeUpTimeStr = document.getElementById('wakeUpTime').value;
    const bedTimeStr = document.getElementById('bedTime').value;
    const fallAsleepMinutes = parseInt(document.getElementById('fallAsleepTime').value);
    
    // Validate inputs
    if (!wakeUpTimeStr || !bedTimeStr || isNaN(fallAsleepMinutes)) {
      alert('Please enter valid values for all fields.');
      return;
    }
    
    // Parse times
    const [wakeUpHours, wakeUpMinutes] = wakeUpTimeStr.split(':').map(Number);
    const [bedHours, bedMinutes] = bedTimeStr.split(':').map(Number);
    
    // Create Date objects for calculations
    const now = new Date();
    const wakeUpTime = new Date(now);
    wakeUpTime.setHours(wakeUpHours, wakeUpMinutes, 0);
    
    const bedTime = new Date(now);
    bedTime.setHours(bedHours, bedMinutes, 0);
    
    // Adjust if bedtime is after midnight
    if (bedTime > wakeUpTime) {
      bedTime.setDate(bedTime.getDate() - 1);
    }
    
    // Calculate actual fall asleep time (bedtime + time to fall asleep)
    const fallAsleepTime = new Date(bedTime);
    fallAsleepTime.setMinutes(fallAsleepTime.getMinutes() + fallAsleepMinutes);
    
    // Calculate total sleep time in minutes
    let sleepMinutes = (wakeUpTime - fallAsleepTime) / (1000 * 60);
    if (sleepMinutes < 0) {
      sleepMinutes += 24 * 60; // Add a day if negative
    }
    
    // Calculate sleep cycles (each cycle is approximately 90 minutes)
    const sleepCycles = Math.floor(sleepMinutes / 90);
    
    // Calculate sleep quality percentage (optimal is 5-6 cycles)
    let sleepQuality = 0;
    if (sleepCycles <= 3) {
      sleepQuality = sleepCycles * 15; // 0-45% for 0-3 cycles
    } else if (sleepCycles <= 6) {
      sleepQuality = 45 + (sleepCycles - 3) * 18; // 45-99% for 4-6 cycles
    } else {
      sleepQuality = 100 - (sleepCycles - 6) * 10; // Decreases for >6 cycles
    }
    sleepQuality = Math.max(0, Math.min(100, sleepQuality)); // Clamp between 0-100
    
    // Update quality marker
    document.getElementById('sleepQualityMarker').style.left = `${sleepQuality}%`;
    
    // Update sleep quality text
    const sleepHours = Math.floor(sleepMinutes / 60);
    const remainingMinutes = Math.round(sleepMinutes % 60);
    document.getElementById('sleepQualityText').textContent = 
      `Based on your planned sleep schedule, you'll get about ${sleepHours} hours and ${remainingMinutes} minutes of sleep (${sleepCycles} complete sleep cycles).`;
    
    // Generate recommended bedtimes (working backwards from wake time)
    this.generateRecommendedBedtimes(wakeUpTime, fallAsleepMinutes);
    
    // Add to history
    const calculationString = `Wake: ${wakeUpTimeStr}, Bed: ${bedTimeStr}, Fall asleep: ${fallAsleepMinutes}min`;
    const result = `${sleepHours}h ${remainingMinutes}m (${sleepCycles} cycles)`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  generateRecommendedBedtimes(wakeUpTime, fallAsleepMinutes) {
    const cyclesList = document.getElementById('sleepCyclesList');
    cyclesList.innerHTML = '';
    
    // Generate 6 recommended bedtimes (for 3-8 sleep cycles)
    for (let cycles = 6; cycles >= 3; cycles--) {
      // Calculate bedtime for this number of cycles
      const cyclesTotalMinutes = cycles * 90;
      const bedTime = new Date(wakeUpTime);
      bedTime.setMinutes(bedTime.getMinutes() - cyclesTotalMinutes - fallAsleepMinutes);
      
      // Format time
      const hours = bedTime.getHours();
      const minutes = bedTime.getMinutes();
      const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
      
      // Create cycle element
      const cycleElement = document.createElement('div');
      cycleElement.className = 'sleep-cycle';
      if (cycles === 5) {
        cycleElement.className += ' recommended';
      }
      
      // Calculate sleep duration
      const sleepHours = Math.floor(cyclesTotalMinutes / 60);
      const sleepMinutes = cyclesTotalMinutes % 60;
      
      cycleElement.innerHTML = `
        <div class="cycle-time">${formattedTime}</div>
        <div class="cycle-description">${cycles} cycles (${sleepHours}h ${sleepMinutes}m)</div>
      `;
      
      cyclesList.appendChild(cycleElement);
    }
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('sleepTip');
    
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

// Initialize sleep calculator when hub.js loads the sleep calculator
document.addEventListener('DOMContentLoaded', () => {
  // The sleep calculator will be initialized when selected in the hub
  window.sleepCalculator = new SleepCalculator();
});
