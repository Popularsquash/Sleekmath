// Calorie Calculator JavaScript

class CalorieCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('calorieHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for calorie results
    this.sarcasticTips = [
      "Counting calories: Because enjoying food without guilt would be too simple.",
      "Your daily calorie needs are directly proportional to how many cookies you're craving.",
      "Remember, calories don't count if no one sees you eating them.",
      "Calorie counting: The adult version of pretending the floor is lava.",
      "If you eat standing up, the calories are just waiting to be burned during your next Netflix marathon.",
      "Calories consumed while researching nutrition facts are considered educational expenses.",
      "The calorie content of food is inversely proportional to how delicious it tastes.",
      "Fitness experts recommend burning calories through exercise, but setting your food on fire works too.",
      "Calories are just tiny creatures that live in your closet and sew your clothes a little tighter every night.",
      "If you eat cake on your birthday, the calories don't count because it's your special day. That's just science."
    ];
  }
  
  initEventListeners() {
    // Calculate button
    document.getElementById('calculateCalories').addEventListener('click', () => {
      this.calculateDailyCalories();
    });
    
    // Clear history button
    document.getElementById('clearCalorieHistory').addEventListener('click', () => {
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
  
  calculateDailyCalories() {
    // Get input values
    const age = parseInt(document.getElementById('calorieAge').value);
    const gender = document.getElementById('calorieGender').value;
    const weight = parseFloat(document.getElementById('calorieWeight').value); // in kg
    const height = parseFloat(document.getElementById('calorieHeight').value); // in cm
    const activityLevel = parseFloat(document.getElementById('activityLevel').value);
    const goal = document.getElementById('calorieGoal').value;
    
    // Validate inputs
    if (isNaN(age) || isNaN(weight) || isNaN(height) || isNaN(activityLevel)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr = 0;
    if (gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;
    
    // Adjust based on goal
    let goalAdjustment = 0;
    let dailyCalories = tdee;
    
    switch (goal) {
      case 'lose':
        goalAdjustment = -500; // Caloric deficit for weight loss
        dailyCalories = tdee - 500;
        break;
      case 'gain':
        goalAdjustment = 500; // Caloric surplus for weight gain
        dailyCalories = tdee + 500;
        break;
      // 'maintain' is default, no adjustment
    }
    
    // Calculate macronutrient breakdown
    let proteinPercentage = 0;
    let carbsPercentage = 0;
    let fatPercentage = 0;
    
    switch (goal) {
      case 'lose':
        proteinPercentage = 40;
        carbsPercentage = 30;
        fatPercentage = 30;
        break;
      case 'gain':
        proteinPercentage = 30;
        carbsPercentage = 50;
        fatPercentage = 20;
        break;
      case 'maintain':
      default:
        proteinPercentage = 30;
        carbsPercentage = 40;
        fatPercentage = 30;
        break;
    }
    
    // Calculate grams of each macronutrient
    const proteinCalories = dailyCalories * (proteinPercentage / 100);
    const carbsCalories = dailyCalories * (carbsPercentage / 100);
    const fatCalories = dailyCalories * (fatPercentage / 100);
    
    const proteinGrams = Math.round(proteinCalories / 4); // 4 calories per gram of protein
    const carbsGrams = Math.round(carbsCalories / 4); // 4 calories per gram of carbs
    const fatGrams = Math.round(fatCalories / 9); // 9 calories per gram of fat
    
    // Update results
    document.getElementById('dailyCalories').textContent = Math.round(dailyCalories);
    document.getElementById('bmrValue').textContent = Math.round(bmr);
    document.getElementById('activityAdjustment').textContent = `+${Math.round(tdee - bmr)}`;
    document.getElementById('goalAdjustment').textContent = goalAdjustment === 0 ? '0' : goalAdjustment > 0 ? `+${goalAdjustment}` : goalAdjustment;
    
    // Update macro chart
    document.getElementById('proteinSegment').style.width = `${proteinPercentage}%`;
    document.getElementById('proteinSegment').textContent = `${proteinPercentage}%`;
    document.getElementById('carbsSegment').style.width = `${carbsPercentage}%`;
    document.getElementById('carbsSegment').textContent = `${carbsPercentage}%`;
    document.getElementById('fatSegment').style.width = `${fatPercentage}%`;
    document.getElementById('fatSegment').textContent = `${fatPercentage}%`;
    
    // Update macro grams
    document.getElementById('proteinGrams').textContent = `${proteinGrams}g`;
    document.getElementById('carbsGrams').textContent = `${carbsGrams}g`;
    document.getElementById('fatGrams').textContent = `${fatGrams}g`;
    
    // Update description based on goal
    let description = '';
    switch (goal) {
      case 'lose':
        description = `This calorie target creates a 500 calorie daily deficit, which should result in about 1 pound of weight loss per week.`;
        break;
      case 'gain':
        description = `This calorie target creates a 500 calorie daily surplus, which should result in about 1 pound of weight gain per week.`;
        break;
      case 'maintain':
      default:
        description = `This calorie target should maintain your current weight while supporting your activity level.`;
        break;
    }
    document.getElementById('calorieDescription').textContent = description;
    
    // Add to history
    const calculationString = `${age}y, ${gender}, ${weight}kg, ${height}cm, ${this.getActivityLevelText(activityLevel)}, ${goal}`;
    const result = `${Math.round(dailyCalories)} calories/day`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  getActivityLevelText(level) {
    switch(level) {
      case 1.2: return 'Sedentary';
      case 1.375: return 'Light Exercise';
      case 1.55: return 'Moderate Exercise';
      case 1.725: return 'Heavy Exercise';
      case 1.9: return 'Athlete';
      default: return 'Unknown';
    }
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('calorieTip');
    
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

// Initialize calorie calculator when hub.js loads the calorie calculator
document.addEventListener('DOMContentLoaded', () => {
  // The calorie calculator will be initialized when selected in the hub
  window.calorieCalculator = new CalorieCalculator();
});
