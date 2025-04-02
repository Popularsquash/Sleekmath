// BMI Calculator JavaScript

class BMICalculator {
  constructor() {
    this.unit = 'metric'; // Default unit system
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('bmiHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for BMI results
    this.sarcasticTips = {
      underweight: [
        "BMI says you're underweight. Have you tried eating the food instead of just photographing it?",
        "Underweight? Maybe those 'All You Can Eat' buffets should be mandatory for you.",
        "Your BMI suggests you're underweight. The good news is you can eat pizza without guilt!",
        "Underweight according to BMI. But remember, BMI doesn't measure how many times people ask if you're sick."
      ],
      normal: [
        "Your BMI is normal. Congratulations on being statistically unremarkable!",
        "Normal BMI? How boring. You're missing out on both diet culture AND body positivity movements.",
        "Your BMI is normal. Don't worry, I'm sure you have other flaws.",
        "BMI says you're normal weight. But don't get too excited, 'normal' is just a setting on a washing machine."
      ],
      overweight: [
        "Overweight? According to a formula from the 1830s that doesn't account for muscle mass, bone density, or your relationship with cake.",
        "Your BMI says you're overweight. But remember, BMI doesn't measure how awesome you are at finding good restaurants.",
        "Overweight according to BMI. Just tell people you're cultivating mass for your role in the next Marvel movie.",
        "BMI says you're overweight. Maybe it's all that knowledge weighing down your brain?"
      ],
      obese: [
        "Your BMI falls in the obese category. But hey, you're just more of you to love, right?",
        "Obese according to BMI. Remember that BMI was invented before Netflix and food delivery apps existed.",
        "Your BMI suggests obesity. Have you considered a career as a bouncer or professional wrestler?",
        "BMI says you're obese. But BMI also doesn't know how good that birthday cake was."
      ],
      general: [
        "BMI: Because we needed a mathematical formula to confirm what your mirror already tells you.",
        "Calculating your BMI is like asking a stranger to rate your appearance on a scale of 1-10.",
        "BMI: Turning your self-esteem into a number since 1832.",
        "BMI is just a number, like your age or your credit score. Except it's the only one that makes you reconsider that second donut."
      ]
    };
  }
  
  initEventListeners() {
    // Unit toggle buttons
    document.querySelectorAll('.bmi-calculator .unit-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.setUnit(button.dataset.unit);
      });
    });
    
    // Calculate button
    document.getElementById('calculateBmi').addEventListener('click', () => {
      this.calculateBMI();
    });
    
    // Clear history button
    document.getElementById('clearBmiHistory').addEventListener('click', () => {
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
  
  setUnit(unit) {
    this.unit = unit;
    
    // Update UI to reflect unit change
    document.querySelectorAll('.bmi-calculator .unit-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`.bmi-calculator .unit-btn[data-unit="${unit}"]`).classList.add('active');
    
    // Show/hide appropriate input fields
    if (unit === 'metric') {
      document.querySelector('.bmi-calculator .metric-inputs').style.display = 'block';
      document.querySelector('.bmi-calculator .imperial-inputs').style.display = 'none';
    } else {
      document.querySelector('.bmi-calculator .metric-inputs').style.display = 'none';
      document.querySelector('.bmi-calculator .imperial-inputs').style.display = 'block';
    }
    
    // Update sarcastic tip
    this.updateSarcasticTip('general');
  }
  
  calculateBMI() {
    let height, weight, bmi;
    let heightDisplay, weightDisplay;
    
    if (this.unit === 'metric') {
      // Get metric inputs
      height = parseFloat(document.getElementById('heightCm').value) / 100; // Convert cm to meters
      weight = parseFloat(document.getElementById('weightKg').value);
      
      heightDisplay = `${document.getElementById('heightCm').value} cm`;
      weightDisplay = `${weight} kg`;
    } else {
      // Get imperial inputs
      const heightFt = parseFloat(document.getElementById('heightFt').value);
      const heightIn = parseFloat(document.getElementById('heightIn').value);
      weight = parseFloat(document.getElementById('weightLbs').value);
      
      // Convert to metric for calculation
      height = ((heightFt * 12) + heightIn) * 0.0254; // Convert inches to meters
      weight = weight * 0.453592; // Convert lbs to kg
      
      heightDisplay = `${heightFt}'${heightIn}"`;
      weightDisplay = `${document.getElementById('weightLbs').value} lbs`;
    }
    
    // Validate inputs
    if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) {
      alert('Please enter valid numbers for height and weight.');
      return;
    }
    
    // Calculate BMI
    bmi = weight / (height * height);
    
    // Determine BMI category
    let category, description;
    if (bmi < 18.5) {
      category = 'Underweight';
      description = 'You are in the underweight range. This may indicate nutritional deficiency or other health issues.';
      this.updateSarcasticTip('underweight');
    } else if (bmi < 25) {
      category = 'Normal Weight';
      description = 'You are in the normal weight range. Maintain a healthy lifestyle with regular exercise and balanced diet.';
      this.updateSarcasticTip('normal');
    } else if (bmi < 30) {
      category = 'Overweight';
      description = 'You are in the overweight range. Consider increasing physical activity and improving dietary choices.';
      this.updateSarcasticTip('overweight');
    } else {
      category = 'Obese';
      description = 'You are in the obese range. This may increase risk for diseases. Consider consulting a healthcare professional.';
      this.updateSarcasticTip('obese');
    }
    
    // Update BMI marker position on scale
    const markerPosition = this.calculateMarkerPosition(bmi);
    document.getElementById('bmiMarker').style.left = `${markerPosition}%`;
    
    // Display results
    document.getElementById('bmiValue').textContent = bmi.toFixed(1);
    document.getElementById('bmiCategory').textContent = category;
    document.getElementById('bmiDescription').textContent = description;
    
    // Add to history
    const calculationString = `BMI: ${heightDisplay}, ${weightDisplay}`;
    const result = `${bmi.toFixed(1)} (${category})`;
    this.addToHistory(calculationString, result);
  }
  
  calculateMarkerPosition(bmi) {
    // Calculate position percentage based on BMI value
    // Scale from 16 to 40 BMI
    const minBmi = 16;
    const maxBmi = 40;
    const clampedBmi = Math.min(Math.max(bmi, minBmi), maxBmi);
    
    return ((clampedBmi - minBmi) / (maxBmi - minBmi)) * 100;
  }
  
  updateSarcasticTip(category) {
    const tips = this.sarcasticTips[category];
    const randomIndex = Math.floor(Math.random() * tips.length);
    const tipElement = document.getElementById('bmiTip');
    
    if (tipElement) {
      tipElement.textContent = tips[randomIndex];
      
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

// Initialize BMI calculator when hub.js loads the BMI calculator
document.addEventListener('DOMContentLoaded', () => {
  // The BMI calculator will be initialized when selected in the hub
  window.bmiCalculator = new BMICalculator();
});

// Add CSS animation for sarcastic tips
document.addEventListener('DOMContentLoaded', () => {
  if (!document.querySelector('.fade-in-animation-added')) {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .fade-in {
        animation: fadeIn 0.5s ease-in-out;
      }
    `;
    style.className = 'fade-in-animation-added';
    document.head.appendChild(style);
  }
});
