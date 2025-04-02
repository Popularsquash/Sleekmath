// Sleek Calculator - JavaScript Functionality

class Calculator {
  constructor() {
    this.previousOperandElement = document.querySelector('.previous-operand');
    this.currentOperandElement = document.querySelector('.current-operand');
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
    
    // Initialize calculation history
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('historyList');
    
    this.initEventListeners();
    this.renderHistoryList();
  }
  
  initEventListeners() {
    // Number buttons
    document.querySelectorAll('.number').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.action === 'decimal') {
          this.appendDecimal();
        } else {
          this.appendNumber(button.dataset.value);
        }
        this.updateDisplay();
      });
    });
    
    // Operator buttons
    document.querySelectorAll('.operator').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.action === 'percent') {
          this.percent();
        } else {
          this.chooseOperation(button.dataset.action);
        }
        this.updateDisplay();
      });
    });
    
    // Equals button
    document.querySelector('[data-action="calculate"]').addEventListener('click', () => {
      this.calculate();
      this.updateDisplay();
    });
    
    // Clear button
    document.querySelector('[data-action="clear"]').addEventListener('click', () => {
      this.clear();
      this.updateDisplay();
    });
    
    // Delete button
    document.querySelector('[data-action="delete"]').addEventListener('click', () => {
      this.delete();
      this.updateDisplay();
    });
    
    // Clear history button
    document.getElementById('clearHistory').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // Keyboard support
    document.addEventListener('keydown', (event) => {
      this.handleKeyboardInput(event);
    });
    
    // History item click to restore calculation
    this.historyListElement.addEventListener('click', (event) => {
      const historyItem = event.target.closest('.history-item');
      if (historyItem) {
        const result = historyItem.querySelector('.history-result').textContent;
        this.currentOperand = result;
        this.updateDisplay();
      }
    });
  }
  
  appendNumber(number) {
    if (this.shouldResetScreen) {
      this.currentOperand = '';
      this.shouldResetScreen = false;
    }
    
    if (this.currentOperand === '0' && number !== '0') {
      this.currentOperand = number;
    } else if (this.currentOperand !== '0') {
      this.currentOperand += number;
    }
  }
  
  appendDecimal() {
    if (this.shouldResetScreen) {
      this.currentOperand = '0';
      this.shouldResetScreen = false;
    }
    
    if (!this.currentOperand.includes('.')) {
      this.currentOperand += '.';
    }
  }
  
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    
    if (this.previousOperand !== '') {
      this.calculate();
    }
    
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.shouldResetScreen = true;
  }
  
  calculate() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    
    if (isNaN(prev) || isNaN(current)) return;
    
    let calculationString = `${this.getDisplayNumber(prev)} ${this.getOperationSymbol(this.operation)} ${this.getDisplayNumber(current)}`;
    
    switch (this.operation) {
      case 'add':
        computation = prev + current;
        break;
      case 'subtract':
        computation = prev - current;
        break;
      case 'multiply':
        computation = prev * current;
        break;
      case 'divide':
        if (current === 0) {
          this.currentOperand = 'Error';
          this.previousOperand = '';
          this.operation = undefined;
          return;
        }
        computation = prev / current;
        break;
      default:
        return;
    }
    
    const result = this.roundResult(computation);
    
    // Add to history
    this.addToHistory(calculationString, result);
    
    this.currentOperand = result.toString();
    this.operation = undefined;
    this.previousOperand = '';
  }
  
  percent() {
    this.currentOperand = (parseFloat(this.currentOperand) / 100).toString();
  }
  
  roundResult(number) {
    // Handle potential floating point issues
    return Math.round(number * 1000000) / 1000000;
  }
  
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimalDigits = stringNumber.split('.')[1];
    
    let integerDisplay;
    
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
    }
    
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }
  
  updateDisplay() {
    if (this.currentOperand === 'Error') {
      this.currentOperandElement.textContent = 'Error';
      return;
    }
    
    this.currentOperandElement.textContent = this.getDisplayNumber(this.currentOperand);
    
    if (this.operation != null) {
      const operationSymbol = this.getOperationSymbol(this.operation);
      this.previousOperandElement.textContent = `${this.getDisplayNumber(this.previousOperand)} ${operationSymbol}`;
    } else {
      this.previousOperandElement.textContent = '';
    }
  }
  
  getOperationSymbol(operation) {
    switch (operation) {
      case 'add': return '+';
      case 'subtract': return '−';
      case 'multiply': return '×';
      case 'divide': return '÷';
      default: return '';
    }
  }
  
  clear() {
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  delete() {
    if (this.currentOperand === '0' || this.currentOperand === 'Error') return;
    
    if (this.currentOperand.length === 1) {
      this.currentOperand = '0';
    } else {
      this.currentOperand = this.currentOperand.slice(0, -1);
    }
  }
  
  handleKeyboardInput(event) {
    // Numbers
    if (/^[0-9]$/.test(event.key)) {
      this.appendNumber(event.key);
      this.updateDisplay();
      return;
    }
    
    // Operators
    switch (event.key) {
      case '+':
        this.chooseOperation('add');
        break;
      case '-':
        this.chooseOperation('subtract');
        break;
      case '*':
        this.chooseOperation('multiply');
        break;
      case '/':
        this.chooseOperation('divide');
        break;
      case '%':
        this.percent();
        break;
      case '.':
      case ',':
        this.appendDecimal();
        break;
      case 'Enter':
      case '=':
        this.calculate();
        break;
      case 'Escape':
        this.clear();
        break;
      case 'Backspace':
        this.delete();
        break;
      default:
        return;
    }
    
    this.updateDisplay();
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
      calculationElement.textContent = `${entry.calculation} =`;
      
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

// Initialize calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const calculator = new Calculator();
});
