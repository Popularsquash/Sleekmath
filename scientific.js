// Scientific Calculator JavaScript

class ScientificCalculator {
  constructor() {
    this.previousOperandElement = document.querySelector('.scientific-calculator .previous-operand');
    this.currentOperandElement = document.querySelector('.scientific-calculator .current-operand');
    this.currentOperand = '0';
    this.previousOperand = '';
    this.operation = undefined;
    this.shouldResetScreen = false;
    this.memory = 0;
    this.angleMode = 'deg'; // Default angle mode (degrees)
    this.calculatorMode = 'standard'; // Default calculator mode
    
    // Initialize calculation history
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('scientificHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
  }
  
  initEventListeners() {
    // Number buttons
    document.querySelectorAll('.scientific-calculator .number').forEach(button => {
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
    document.querySelectorAll('.scientific-calculator .operator').forEach(button => {
      button.addEventListener('click', () => {
        if (button.dataset.action === 'percent') {
          this.percent();
        } else {
          this.chooseOperation(button.dataset.action);
        }
        this.updateDisplay();
      });
    });
    
    // Function buttons
    document.querySelectorAll('.scientific-calculator .function-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.handleFunction(button.dataset.action);
        this.updateDisplay();
      });
    });
    
    // Memory buttons
    document.querySelectorAll('.scientific-calculator .memory-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.handleMemory(button.dataset.action);
        this.updateDisplay();
      });
    });
    
    // Mode toggle buttons
    document.querySelectorAll('.scientific-calculator .mode-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.setCalculatorMode(button.dataset.mode);
      });
    });
    
    // Angle toggle buttons
    document.querySelectorAll('.scientific-calculator .angle-btn').forEach(button => {
      button.addEventListener('click', () => {
        this.setAngleMode(button.dataset.angle);
      });
    });
    
    // Equals button
    document.querySelector('.scientific-calculator [data-action="calculate"]').addEventListener('click', () => {
      this.calculate();
      this.updateDisplay();
    });
    
    // Clear button
    document.querySelector('.scientific-calculator [data-action="clear"]').addEventListener('click', () => {
      this.clear();
      this.updateDisplay();
    });
    
    // Delete button
    document.querySelector('.scientific-calculator [data-action="delete"]').addEventListener('click', () => {
      this.delete();
      this.updateDisplay();
    });
    
    // Clear history button
    document.getElementById('clearScientificHistory').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // Keyboard support
    document.addEventListener('keydown', (event) => {
      if (document.querySelector('.scientific-calculator').classList.contains('active')) {
        this.handleKeyboardInput(event);
      }
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
      case 'power':
        computation = Math.pow(prev, current);
        break;
      case 'root':
        computation = Math.pow(prev, 1/current);
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
  
  handleFunction(func) {
    let result;
    const current = parseFloat(this.currentOperand);
    
    if (isNaN(current) && func !== 'pi' && func !== 'e') return;
    
    let calculationString;
    
    switch (func) {
      case 'square':
        calculationString = `sqr(${this.getDisplayNumber(current)})`;
        result = current * current;
        break;
      case 'cube':
        calculationString = `cube(${this.getDisplayNumber(current)})`;
        result = current * current * current;
        break;
      case 'sqrt':
        if (current < 0) {
          this.currentOperand = 'Error';
          return;
        }
        calculationString = `√(${this.getDisplayNumber(current)})`;
        result = Math.sqrt(current);
        break;
      case 'cbrt':
        calculationString = `∛(${this.getDisplayNumber(current)})`;
        result = Math.cbrt(current);
        break;
      case 'sin':
        calculationString = `sin(${this.getDisplayNumber(current)})`;
        result = this.calculateTrigFunction(Math.sin, current);
        break;
      case 'cos':
        calculationString = `cos(${this.getDisplayNumber(current)})`;
        result = this.calculateTrigFunction(Math.cos, current);
        break;
      case 'tan':
        calculationString = `tan(${this.getDisplayNumber(current)})`;
        result = this.calculateTrigFunction(Math.tan, current);
        break;
      case 'log':
        if (current <= 0) {
          this.currentOperand = 'Error';
          return;
        }
        calculationString = `log(${this.getDisplayNumber(current)})`;
        result = Math.log10(current);
        break;
      case 'ln':
        if (current <= 0) {
          this.currentOperand = 'Error';
          return;
        }
        calculationString = `ln(${this.getDisplayNumber(current)})`;
        result = Math.log(current);
        break;
      case 'factorial':
        if (current < 0 || !Number.isInteger(current)) {
          this.currentOperand = 'Error';
          return;
        }
        calculationString = `fact(${this.getDisplayNumber(current)})`;
        result = this.factorial(current);
        break;
      case 'abs':
        calculationString = `|${this.getDisplayNumber(current)}|`;
        result = Math.abs(current);
        break;
      case 'pi':
        result = Math.PI;
        break;
      case 'e':
        result = Math.E;
        break;
      case 'exp':
        calculationString = `exp(${this.getDisplayNumber(current)})`;
        result = Math.exp(current);
        break;
      default:
        return;
    }
    
    if (calculationString) {
      const roundedResult = this.roundResult(result);
      this.addToHistory(calculationString, roundedResult);
    }
    
    this.currentOperand = this.roundResult(result).toString();
    this.shouldResetScreen = true;
  }
  
  calculateTrigFunction(func, value) {
    // Convert to radians if in degree or gradian mode
    if (this.angleMode === 'deg') {
      value = value * (Math.PI / 180);
    } else if (this.angleMode === 'grad') {
      value = value * (Math.PI / 200);
    }
    
    return func(value);
  }
  
  factorial(n) {
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
      if (!isFinite(result)) break;
    }
    return result;
  }
  
  handleMemory(action) {
    const current = parseFloat(this.currentOperand);
    
    switch (action) {
      case 'mc': // Memory Clear
        this.memory = 0;
        break;
      case 'mr': // Memory Recall
        this.currentOperand = this.memory.toString();
        this.shouldResetScreen = true;
        break;
      case 'm-plus': // Memory Add
        if (!isNaN(current)) {
          this.memory += current;
        }
        this.shouldResetScreen = true;
        break;
      case 'm-minus': // Memory Subtract
        if (!isNaN(current)) {
          this.memory -= current;
        }
        this.shouldResetScreen = true;
        break;
      case 'ms': // Memory Store
        if (!isNaN(current)) {
          this.memory = current;
        }
        this.shouldResetScreen = true;
        break;
      case 'm-toggle': // Memory Toggle (show memory value)
        // This would typically show a dropdown with memory values
        // For simplicity, we'll just recall the memory
        this.currentOperand = this.memory.toString();
        this.shouldResetScreen = true;
        break;
    }
  }
  
  setCalculatorMode(mode) {
    this.calculatorMode = mode;
    
    // Update UI to reflect mode change
    document.querySelectorAll('.scientific-calculator .mode-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`.scientific-calculator .mode-btn[data-mode="${mode}"]`).classList.add('active');
    
    // Add sarcastic message based on mode
    let message = '';
    switch (mode) {
      case 'standard':
        message = "Back to basics? I thought you were smarter than that.";
        break;
      case 'scientific':
        message = "Ooh, look who thinks they're a scientist now!";
        break;
      case 'programmer':
        message = "01001110 01100101 01110010 01100100 (That's 'nerd' in binary)";
        break;
    }
    
    document.getElementById('sarcasticMessage').textContent = message;
  }
  
  setAngleMode(mode) {
    this.angleMode = mode;
    
    // Update UI to reflect angle mode change
    document.querySelectorAll('.scientific-calculator .angle-btn').forEach(btn => {
      btn.classList.remove('active');
    });
    
    document.querySelector(`.scientific-calculator .angle-btn[data-angle="${mode}"]`).classList.add('active');
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
      case 'power': return '^';
      case 'root': return '√';
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
      case '^':
        this.chooseOperation('power');
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
      case 'p':
        this.handleFunction('pi');
        break;
      case 'e':
        this.handleFunction('e');
        break;
      case 's':
        this.handleFunction('sin');
        break;
      case 'c':
        this.handleFunction('cos');
        break;
      case 't':
        this.handleFunction('tan');
        break;
      case 'l':
        this.handleFunction('log');
        break;
      case 'n':
        this.handleFunction('ln');
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

// Initialize scientific calculator when hub.js loads the scientific calculator
document.addEventListener('DOMContentLoaded', () => {
  // The scientific calculator will be initialized when selected in the hub
  window.scientificCalculator = new ScientificCalculator();
});
