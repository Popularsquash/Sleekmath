// Mortgage Calculator JavaScript

class MortgageCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('mortgageHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for mortgage results
    this.sarcasticTips = [
      "Congratulations on your 30-year commitment! That's longer than most marriages last these days.",
      "Your mortgage payment is just the beginning. Wait until you discover the joys of unexpected home repairs!",
      "Remember, it's not debt—it's 'leveraging your future self's income' for today's housing needs.",
      "This house payment is the gift that keeps on giving... for the next three decades.",
      "Think of your mortgage as a forced savings plan, except you can't access the money and the bank owns your house.",
      "Your monthly payment is less than rent? Great! Now you just need to add property tax, insurance, maintenance, and your will to live.",
      "The good news: You'll build equity! The bad news: You'll be too old to enjoy it when the house is finally yours.",
      "Buying a house: Because renting wasn't stressful enough, you needed the added anxiety of being responsible for everything that breaks.",
      "Mortgage comes from the Latin 'mort' meaning 'death' and 'gage' meaning 'pledge'. Coincidence? I think not.",
      "Home ownership: Where 'I should call a professional' becomes 'How hard could it be to fix this myself?'"
    ];
  }
  
  initEventListeners() {
    // Link down payment amount and percentage
    document.getElementById('downPayment').addEventListener('input', () => {
      this.updateDownPaymentPercent();
    });
    
    document.getElementById('downPaymentPercent').addEventListener('input', () => {
      this.updateDownPaymentAmount();
    });
    
    document.getElementById('homePrice').addEventListener('input', () => {
      this.updateDownPaymentAmount();
    });
    
    // Calculate button
    document.getElementById('calculateMortgage').addEventListener('click', () => {
      this.calculateMortgage();
    });
    
    // Clear history button
    document.getElementById('clearMortgageHistory').addEventListener('click', () => {
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
  
  updateDownPaymentPercent() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    
    if (!isNaN(homePrice) && !isNaN(downPayment) && homePrice > 0) {
      const downPaymentPercent = (downPayment / homePrice) * 100;
      document.getElementById('downPaymentPercent').value = downPaymentPercent.toFixed(1);
    }
  }
  
  updateDownPaymentAmount() {
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPaymentPercent = parseFloat(document.getElementById('downPaymentPercent').value);
    
    if (!isNaN(homePrice) && !isNaN(downPaymentPercent) && homePrice > 0) {
      const downPayment = (downPaymentPercent / 100) * homePrice;
      document.getElementById('downPayment').value = Math.round(downPayment);
    }
  }
  
  calculateMortgage() {
    // Get input values
    const homePrice = parseFloat(document.getElementById('homePrice').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const loanTerm = parseInt(document.getElementById('loanTerm').value);
    const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
    const propertyTax = parseFloat(document.getElementById('propertyTax').value);
    const homeInsurance = parseFloat(document.getElementById('homeInsurance').value);
    const pmiRate = parseFloat(document.getElementById('pmi').value) / 100;
    const hoaFees = parseFloat(document.getElementById('hoaFees').value);
    
    // Validate inputs
    if (isNaN(homePrice) || isNaN(downPayment) || isNaN(loanTerm) || isNaN(interestRate) || 
        isNaN(propertyTax) || isNaN(homeInsurance) || isNaN(pmiRate) || isNaN(hoaFees)) {
      alert('Please enter valid numbers for all fields.');
      return;
    }
    
    // Calculate loan amount
    const loanAmount = homePrice - downPayment;
    
    // Calculate monthly principal and interest payment
    const monthlyInterestRate = interestRate / 12;
    const numberOfPayments = loanTerm * 12;
    
    let monthlyPI = 0;
    if (interestRate === 0) {
      monthlyPI = loanAmount / numberOfPayments;
    } else {
      monthlyPI = loanAmount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) / 
                 (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);
    }
    
    // Calculate monthly property tax
    const monthlyPropertyTax = propertyTax / 12;
    
    // Calculate monthly home insurance
    const monthlyHomeInsurance = homeInsurance / 12;
    
    // Calculate PMI (if down payment is less than 20%)
    let monthlyPMI = 0;
    const downPaymentPercent = (downPayment / homePrice) * 100;
    
    if (downPaymentPercent < 20) {
      monthlyPMI = (loanAmount * pmiRate) / 12;
    }
    
    // Calculate total monthly payment
    const totalMonthlyPayment = monthlyPI + monthlyPropertyTax + monthlyHomeInsurance + monthlyPMI + hoaFees;
    
    // Calculate total payment over loan term
    const totalPayment = totalMonthlyPayment * numberOfPayments;
    
    // Calculate principal vs interest ratio for pie chart
    const totalInterestPaid = (monthlyPI * numberOfPayments) - loanAmount;
    const principalPercent = (loanAmount / (loanAmount + totalInterestPaid)) * 100;
    
    // Update pie chart
    document.getElementById('paymentPieChart').style.setProperty('--principal-percent', `${principalPercent}%`);
    
    // Display results
    document.getElementById('loanAmount').textContent = this.formatCurrency(loanAmount);
    document.getElementById('monthlyPI').textContent = this.formatCurrency(monthlyPI);
    document.getElementById('monthlyPropertyTax').textContent = this.formatCurrency(monthlyPropertyTax);
    document.getElementById('monthlyHomeInsurance').textContent = this.formatCurrency(monthlyHomeInsurance);
    document.getElementById('monthlyPMI').textContent = this.formatCurrency(monthlyPMI);
    document.getElementById('monthlyHOA').textContent = this.formatCurrency(hoaFees);
    document.getElementById('totalMonthlyPayment').textContent = this.formatCurrency(totalMonthlyPayment);
    document.getElementById('totalPayment').textContent = this.formatCurrency(totalPayment);
    
    // Add to history
    const calculationString = `Mortgage: $${homePrice} home, ${downPaymentPercent.toFixed(1)}% down, ${interestRate * 100}% for ${loanTerm} years`;
    const result = `Monthly: ${this.formatCurrency(totalMonthlyPayment)}`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('mortgageTip');
    
    if (tipElement) {
      tipElement.textContent = this.sarcasticTips[randomIndex];
      
      // Add fade-in animation
      tipElement.classList.remove('fade-in');
      void tipElement.offsetWidth; // Trigger reflow
      tipElement.classList.add('fade-in');
    }
  }
  
  formatCurrency(value) {
    return '$' + value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
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

// Initialize mortgage calculator when hub.js loads the mortgage calculator
document.addEventListener('DOMContentLoaded', () => {
  // The mortgage calculator will be initialized when selected in the hub
  window.mortgageCalculator = new MortgageCalculator();
});
