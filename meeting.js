// JavaScript for Meeting Productivity Calculator

class MeetingCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('meetingHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for meeting results
    this.sarcasticTips = [
      "A meeting is an event where minutes are kept and hours are lost.",
      "Meetings: the practical alternative to work.",
      "The length of a meeting rises to fill the time available.",
      "If you had to identify, in one word, the reason why the human race has not achieved its full potential, that word would be 'meetings'.",
      "A committee is a group that keeps minutes and loses hours.",
      "The only thing more painful than attending a bad meeting is scheduling another one to discuss why the first one was so terrible.",
      "Meetings are indispensable when you don't want to do anything.",
      "People who enjoy meetings should not be in charge of anything.",
      "The best way to appreciate your job is to imagine yourself without one, in a meeting.",
      "I know you think this meeting is a waste of time, but it's actually a team-building exercise in shared suffering."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateMeeting').addEventListener('click', () => {
      this.calculateMeetingProductivity();
    });
    
    // Necessity slider
    const necessitySlider = document.getElementById('necessitySlider');
    const necessityValue = document.getElementById('necessityValue');
    necessitySlider.addEventListener('input', () => {
      necessityValue.textContent = necessitySlider.value;
    });
    
    // Clear history button
    document.getElementById('clearMeetingHistory').addEventListener('click', () => {
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
  
  calculateMeetingProductivity() {
    // Get input values
    const meetingName = document.getElementById('meetingName').value.trim();
    const attendeeCount = parseInt(document.getElementById('attendeeCount').value);
    const averageSalary = parseFloat(document.getElementById('averageSalary').value);
    const meetingDuration = parseInt(document.getElementById('meetingDuration').value);
    const necessityLevel = parseInt(document.getElementById('necessitySlider').value);
    const hasAgenda = document.getElementById('hasAgenda').checked;
    const mandatoryAttendance = document.getElementById('mandatoryAttendance').checked;
    const recurringMeeting = document.getElementById('recurringMeeting').checked;
    const laptopsAllowed = document.getElementById('laptopsAllowed').checked;
    
    // Validate inputs
    if (!meetingName) {
      alert('Please enter a meeting name.');
      return;
    }
    
    if (isNaN(attendeeCount) || attendeeCount <= 0) {
      alert('Please enter a valid number of attendees.');
      return;
    }
    
    if (isNaN(averageSalary) || averageSalary <= 0) {
      alert('Please enter a valid average salary.');
      return;
    }
    
    if (isNaN(meetingDuration) || meetingDuration <= 0) {
      alert('Please enter a valid meeting duration.');
      return;
    }
    
    // Calculate base cost
    const hourlyMeetingCost = (averageSalary * attendeeCount);
    const meetingCost = hourlyMeetingCost * (meetingDuration / 60);
    
    // Calculate productivity factors
    let productivityPercentage = 0;
    
    // Necessity factor (0-100%)
    productivityPercentage += necessityLevel * 10;
    
    // Agenda factor
    if (hasAgenda) {
      productivityPercentage += 20;
    } else {
      productivityPercentage -= 20;
    }
    
    // Mandatory attendance factor
    if (mandatoryAttendance && attendeeCount > 5) {
      productivityPercentage -= 15;
    }
    
    // Recurring meeting factor
    if (recurringMeeting) {
      productivityPercentage -= 10;
    }
    
    // Laptops factor
    if (laptopsAllowed) {
      productivityPercentage -= 25;
    }
    
    // Cap productivity between 0-100%
    productivityPercentage = Math.max(0, Math.min(100, productivityPercentage));
    
    // Calculate productive cost and wasted cost
    const productiveCost = meetingCost * (productivityPercentage / 100);
    const wastedCost = meetingCost - productiveCost;
    
    // Calculate annual cost if recurring
    let annualCost = 0;
    if (recurringMeeting) {
      // Assume weekly meetings for 48 weeks
      annualCost = meetingCost * 48;
    }
    
    // Generate analysis text
    let analysis = `Meeting: "${meetingName}"\n\n`;
    analysis += `Total cost: $${meetingCost.toFixed(2)} (${attendeeCount} people at $${averageSalary}/hour for ${meetingDuration} minutes)\n`;
    analysis += `Productivity: ${productivityPercentage.toFixed(0)}%\n`;
    analysis += `Productive value: $${productiveCost.toFixed(2)}\n`;
    analysis += `Wasted money: $${wastedCost.toFixed(2)}\n\n`;
    
    if (recurringMeeting) {
      analysis += `If this is a weekly meeting, it costs approximately $${annualCost.toFixed(2)} per year.\n\n`;
    }
    
    // Add specific analysis based on factors
    if (productivityPercentage < 30) {
      analysis += "This meeting is a spectacular waste of time and money. Consider an email instead.";
    } else if (productivityPercentage < 60) {
      analysis += "This meeting has some value, but could be significantly improved with better planning.";
    } else if (productivityPercentage < 80) {
      analysis += "This is a reasonably productive meeting, but there's still room for improvement.";
    } else {
      analysis += "This is a highly productive meeting. Whatever you're doing, keep it up!";
    }
    
    // Add specific tips
    if (!hasAgenda) {
      analysis += " Adding an agenda would significantly improve productivity.";
    }
    
    if (mandatoryAttendance && attendeeCount > 5) {
      analysis += " Consider making attendance optional for some participants.";
    }
    
    if (laptopsAllowed) {
      analysis += " Those laptops aren't being used for notes - they're for checking email and Slack.";
    }
    
    // Update display
    document.getElementById('meetingCost').textContent = `$${meetingCost.toFixed(2)}`;
    document.getElementById('productivityMeter').style.width = `${productivityPercentage}%`;
    document.getElementById('meetingAnalysis').textContent = analysis;
    
    // Add to history
    const calculationString = `"${meetingName}" (${attendeeCount} people, ${meetingDuration} min)`;
    const result = `$${meetingCost.toFixed(2)} (${productivityPercentage.toFixed(0)}% productive)`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('meetingTip');
    
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

// Initialize meeting calculator when hub.js loads the meeting calculator
document.addEventListener('DOMContentLoaded', () => {
  // The meeting calculator will be initialized when selected in the hub
  window.meetingCalculator = new MeetingCalculator();
});
