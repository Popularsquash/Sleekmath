// Financial Calculator JavaScript

class FinancialCalculator {
  constructor() {
    this.calculatorType = 'investment'; // Default calculator type
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('financialHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for each calculator type
    this.sarcasticTips = {
      investment: [
        "Pro tip: Invest now, so you can afford better excuses for being antisocial later.",
        "The best time to invest was 20 years ago. The second best time is now. The third best time is after you've finished that Netflix series.",
        "Investing: Because watching your money do nothing in a savings account is like watching paint dry, but less exciting.",
        "Remember, it's not gambling if you call it 'investing'!",
        "Compound interest is like magic, except it's real and doesn't require you to wear a ridiculous hat."
      ],
      loan: [
        "Remember: Debt is just future you's problem. Good luck, future you!",
        "Taking out a loan is like borrowing an umbrella on a sunny day. It seems unnecessary until it starts raining bills.",
        "The best way to get out of debt is to not get into it. I'll wait while you time travel back to fix that.",
        "Loans: Because why enjoy your money later when you can spend someone else's now?",
        "If you think nobody cares about you, try missing a loan payment."
      ],
      compound: [
        "Einstein called compound interest the 8th wonder of the world. He also had terrible hair, so take that as you will.",
        "Compound interest is like a snowball rolling downhill, except the hill is your life and the snowball is either your wealth or your debt.",
        "The magic of compound interest: turning your coffee money into retirement money, assuming you live to be 250 years old.",
        "Compound interest: Nature's way of rewarding the patient and punishing the indebted.",
        "Time is money, especially with compound interest. So technically, procrastination is costing you twice."
      ],
      roi: [
        "ROI: Because 'I made money' sounds less impressive than 'I achieved a 25% return on investment.'",
        "A good ROI is like a good haircut: everyone notices, but nobody knows exactly what you did differently.",
        "Calculating ROI is like weighing yourself after a diet: the numbers don't lie, but you'll still find ways to justify the pizza.",
        "ROI: The financial equivalent of 'pics or it didn't happen.'",
        "If your investment strategy doesn't have a positive ROI, it's not an investment strategy—it's a donation strategy."
      ]
    };
  }
  
  initEventListeners() {
    // Calculator type selector buttons
    document.querySelectorAll('.financial-calculator .calculator-type-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.setCalculatorType(button.dataset.type);
      });
    });
    
    // Investment calculator
    document.getElementById('calculateInvestment').addEventListener('click', () => {
      this.calculateInvestment();
    });
    
    // Loan calculator
    document.getElementById('calculateLoan').addEventListener('click', () => {
      this.calculateLoan();
    });
    
    // Compound interest calculator
    document.getElementById('calculateCompound').addEventListener('click', () => {
      this.calculateCompoundInterest();
    });
    
    // ROI calculator
    document.getElementById('calculateRoi').addEventListener('click', () => {
      this.calculateROI();
    });
    
    // Clear history button
    document.getElementById('clearFinancialHistory').addEventListener('click', () => {
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
  
  setCalculatorType(type) {
    this.calculatorType = type;
    
    // Update UI to reflect calculator type change
    document.querySelectorAll('.financial-calculator .calculator-type-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`.financial-calculator .calculator-type-btn[data-type="${type}"]`).classList.add('active');
    
    // Hide all calculator sections
    document.querySelectorAll('.financial-calculator .financial-calc-section').forEach(section => {
      section.classList.remove('active');
    });
    
    // Show selected calculator section
    document.getElementById(`${type}Calculator`).classList.add('active');
    
    // Update sarcastic tip
    this.updateSarcasticTip(type);
  }
  
  updateSarcasticTip(type) {
    const tips = this.sarcasticTips[type];
    const randomIndex = Math.floor(Math.random() * tips.length);
    const tipElement = document.getElementById(`${type}Tip`);
    
    if (tipElement) {
      tipElement.textContent = tips[randomIndex];
      
      // Add fade-in animation
      tipElement.classList.remove('fade-in');
      void tipElement.offsetWidth; // Trigger reflow
      tipElement.classList.add('fade-in');
    }
  }
  
  calculateInvestment() {
    // Get input values
    const initialInvestment = parseFloat(document.getElementById('initialInvestment').value);
    const monthlyContribution = parseFloat(document.getElementById('monthlyContribution').value);
    const annualInterestRate = parseFloat(document.getElementById('annualInterestRate').value) / 100;
    const years = parseInt(document.getElementById('investmentYears').value);
    const compoundFrequency = parseInt(document.getElementById('compoundFrequency').value);
    
    // Validate inputs
    if (isNaN(initialInvestment) || isNaN(monthlyContribution) || isNaN(annualInterestRate) || isNaN(years) || isNaN(compoundFrequency)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate future value
    const periodicRate = annualInterestRate / compoundFrequency;
    const totalPeriods = years * compoundFrequency;
    
    // Calculate future value of initial investment
    const initialFV = initialInvestment * Math.pow(1 + periodicRate, totalPeriods);
    
    // Calculate future value of periodic contributions
    let contributionFV = 0;
    if (periodicRate > 0) {
      contributionFV = monthlyContribution * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    } else {
      contributionFV = monthlyContribution * totalPeriods;
    }
    
    // Adjust for monthly contributions (assuming contributions at end of period)
    const monthlyRate = periodicRate / (12 / (12 / compoundFrequency));
    if (compoundFrequency !== 12) {
      contributionFV = monthlyContribution * 12 / compoundFrequency * ((Math.pow(1 + periodicRate, totalPeriods) - 1) / periodicRate);
    }
    
    const futureValue = initialFV + contributionFV;
    const totalContributions = initialInvestment + (monthlyContribution * 12 * years);
    const totalInterest = futureValue - totalContributions;
    
    // Display results
    document.getElementById('futureValue').textContent = this.formatCurrency(futureValue);
    document.getElementById('totalContributions').textContent = this.formatCurrency(totalContributions);
    document.getElementById('totalInterest').textContent = this.formatCurrency(totalInterest);
    
    // Add to history
    const calculationString = `Investment: $${initialInvestment} initial + $${monthlyContribution}/mo at ${annualInterestRate * 100}% for ${years} years`;
    this.addToHistory(calculationString, this.formatCurrency(futureValue));
    
    // Update sarcastic tip
    this.updateSarcasticTip('investment');
  }
  
  calculateLoan() {
    // Get input values
    const loanAmount = parseFloat(document.getElementById('loanAmount').value);
    const interestRate = parseFloat(document.getElementById('loanInterestRate').value) / 100;
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    
    // Validate inputs
    if (isNaN(loanAmount) || isNaN(interestRate) || isNaN(loanTerm)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate monthly payment
    const monthlyRate = interestRate / 12;
    const totalPayments = loanTerm * 12;
    
    let monthlyPayment = 0;
    if (interestRate === 0) {
      monthlyPayment = loanAmount / totalPayments;
    } else {
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / (Math.pow(1 + monthlyRate, totalPayments) - 1);
    }
    
    const totalPayment = monthlyPayment * totalPayments;
    const totalInterest = totalPayment - loanAmount;
    
    // Display results
    document.getElementById('monthlyPayment').textContent = this.formatCurrency(monthlyPayment);
    document.getElementById('totalPayment').textContent = this.formatCurrency(totalPayment);
    document.getElementById('loanTotalInterest').textContent = this.formatCurrency(totalInterest);
    
    // Add to history
    const calculationString = `Loan: $${loanAmount} at ${interestRate * 100}% for ${loanTerm} years`;
    this.addToHistory(calculationString, `Monthly: ${this.formatCurrency(monthlyPayment)}`);
    
    // Update sarcastic tip
    this.updateSarcasticTip('loan');
  }
  
  calculateCompoundInterest() {
    // Get input values
    const principal = parseFloat(document.getElementById('principalAmount').value);
    const interestRate = parseFloat(document.getElementById('compoundInterestRate').value) / 100;
    const years = parseInt(document.getElementById('compoundYears').value);
    const compoundPeriods = parseInt(document.getElementById('compoundPeriods').value);
    
    // Validate inputs
    if (isNaN(principal) || isNaN(interestRate) || isNaN(years) || isNaN(compoundPeriods)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate compound interest
    const rate = interestRate / compoundPeriods;
    const n = compoundPeriods * years;
    
    const futureValue = principal * Math.pow(1 + rate, n);
    const totalInterest = futureValue - principal;
    
    // Display results
    document.getElementById('compoundFutureValue').textContent = this.formatCurrency(futureValue);
    document.getElementById('compoundTotalInterest').textContent = this.formatCurrency(totalInterest);
    
    // Add to history
    const calculationString = `Compound: $${principal} at ${interestRate * 100}% for ${years} years (${this.getCompoundFrequencyName(compoundPeriods)})`;
    this.addToHistory(calculationString, this.formatCurrency(futureValue));
    
    // Update sarcastic tip
    this.updateSarcasticTip('compound');
  }
  
  calculateROI() {
    // Get input values
    const initialInvestment = parseFloat(document.getElementById('roiInitialInvestment').value);
    const finalValue = parseFloat(document.getElementById('roiFinalValue').value);
    const years = parseInt(document.getElementById('roiYears').value);
    
    // Validate inputs
    if (isNaN(initialInvestment) || isNaN(finalValue) || isNaN(years)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate ROI
    const totalReturn = finalValue - initialInvestment;
    const roi = (totalReturn / initialInvestment) * 100;
    
    // Calculate annualized ROI
    const annualizedRoi = (Math.pow(finalValue / initialInvestment, 1 / years) - 1) * 100;
    
    // Display results
    document.getElementById('totalReturn').textContent = this.formatCurrency(totalReturn);
    document.getElementById('roiPercentage').textContent = this.formatPercentage(roi);
    document.getElementById('annualizedRoi').textContent = this.formatPercentage(annualizedRoi);
    
    // Add to history
    const calculationString = `ROI: $${initialInvestment} to $${finalValue} over ${years} years`;
    this.addToHistory(calculationString, `${this.formatPercentage(roi)} (${this.formatPercentage(annualizedRoi)} annual)`);
    
    // Update sarcastic tip
    this.updateSarcasticTip('roi');
  }
  
  getCompoundFrequencyName(frequency) {
    switch (frequency) {
      case 1: return 'Annually';
      case 2: return 'Semi-Annually';
      case 4: return 'Quarterly';
      case 12: return 'Monthly';
      case 365: return 'Daily';
      default: return frequency + ' times per year';
    }
  }
  
  formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }
  
  formatPercentage(value) {
    return value.toFixed(2) + '%';
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

// Initialize financial calculator when hub.js loads the financial calculator
document.addEventListener('DOMContentLoaded', () => {
  // The financial calculator will be initialized when selected in the hub
  window.financialCalculator = new FinancialCalculator();
});

// Add CSS animation for sarcastic tips
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .fade-in {
      animation: fadeIn 0.5s ease-in-out;
    }
    
    .financial-calc-section {
      display: none;
    }
    
    .financial-calc-section.active {
      display: block;
    }
  `;
  document.head.appendChild(style);
});
