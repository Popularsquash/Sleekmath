// AI Math Solver JavaScript

class AICalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('aiHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for AI results
    this.sarcasticTips = [
      "AI: Because doing math yourself is so last century.",
      "Why struggle with equations when AI can struggle for you?",
      "This answer was brought to you by an AI that never had to take a math test.",
      "Congratulations on outsourcing your thinking to an algorithm!",
      "Math teachers hate this one weird trick: letting AI do all your work.",
      "Remember when we had to solve problems ourselves? Yeah, me neither.",
      "AI solving math problems: Like having a calculator, but with more attitude.",
      "Who needs years of education when you have AI to do the thinking?",
      "Your brain: 'I could have done that.' (Narrator: It couldn't.)",
      "The answer is correct, but the real question is: will this be on the test?"
    ];
  }
  
  initEventListeners() {
    // Solve button
    document.getElementById('solveAI').addEventListener('click', () => {
      this.solveWithAI();
    });
    
    // Example items
    document.querySelectorAll('.example-item').forEach(item => {
      item.addEventListener('click', () => {
        const example = item.getAttribute('data-example');
        document.getElementById('aiEquation').value = example;
      });
    });
    
    // Clear history button
    document.getElementById('clearAIHistory').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // History item click to show details
    this.historyListElement.addEventListener('click', (event) => {
      const historyItem = event.target.closest('.history-item');
      if (historyItem) {
        const equation = historyItem.getAttribute('data-equation');
        if (equation) {
          document.getElementById('aiEquation').value = equation;
        }
      }
    });
    
    // Enter key in textarea
    document.getElementById('aiEquation').addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && event.ctrlKey) {
        event.preventDefault();
        this.solveWithAI();
      }
    });
  }
  
  solveWithAI() {
    const equation = document.getElementById('aiEquation').value.trim();
    const solutionType = document.getElementById('solutionType').value;
    const mathLevel = document.getElementById('mathLevel').value;
    
    if (!equation) {
      alert('Please enter a math problem or equation.');
      return;
    }
    
    // Show loading indicator
    document.getElementById('aiLoading').style.display = 'block';
    document.getElementById('aiResult').style.display = 'none';
    
    // Simulate AI processing (in a real implementation, this would call an API)
    setTimeout(() => {
      this.generateSolution(equation, solutionType, mathLevel);
      
      // Hide loading indicator
      document.getElementById('aiLoading').style.display = 'none';
      document.getElementById('aiResult').style.display = 'block';
      
      // Add to history
      this.addToHistory(equation, "Solution generated");
      
      // Update sarcastic tip
      this.updateSarcasticTip();
    }, 1500); // Simulate processing time
  }
  
  generateSolution(equation, solutionType, mathLevel) {
    let solution = '';
    
    // This is a simplified mock implementation
    // In a real implementation, this would call an AI API like OpenAI or Claude
    
    if (equation.toLowerCase().includes('solve for x')) {
      if (solutionType === 'step-by-step') {
        solution = this.generateAlgebraSolution(equation);
      } else {
        solution = this.generateQuickAlgebraSolution(equation);
      }
    } else if (equation.toLowerCase().includes('derivative')) {
      if (solutionType === 'step-by-step') {
        solution = this.generateCalculusSolution(equation);
      } else {
        solution = this.generateQuickCalculusSolution(equation);
      }
    } else if (equation.toLowerCase().includes('convert')) {
      solution = this.generateConversionSolution(equation);
    } else if (equation.toLowerCase().includes('area')) {
      solution = this.generateGeometrySolution(equation);
    } else {
      solution = `I'll solve this step-by-step:\n\n1. First, I need to understand the problem: "${equation}"\n\n2. This appears to be a ${this.detectProblemType(equation)} problem.\n\n3. For a more accurate solution, I would need to connect to an AI service.\n\n4. In a full implementation, this would use OpenAI's API or a similar service to generate a complete solution.\n\n5. The solution would be formatted with proper mathematical notation and explanations appropriate for ${mathLevel} level.`;
    }
    
    document.getElementById('aiSolution').textContent = solution;
  }
  
  detectProblemType(equation) {
    const eq = equation.toLowerCase();
    if (eq.includes('solve') || eq.includes('equation') || eq.includes('=')) return 'algebra';
    if (eq.includes('derivative') || eq.includes('integral')) return 'calculus';
    if (eq.includes('area') || eq.includes('volume') || eq.includes('perimeter')) return 'geometry';
    if (eq.includes('convert') || eq.includes('to')) return 'conversion';
    if (eq.includes('probability') || eq.includes('chance')) return 'probability';
    return 'mathematical';
  }
  
  generateAlgebraSolution(equation) {
    // Mock solution for algebra problems
    return `I'll solve this step-by-step:

1. Original equation: ${equation}

2. Let's isolate the variable by moving all terms with x to the left side and all other terms to the right side.

3. For example, if we have "2x - 7 = 15":
   2x - 7 = 15
   2x = 15 + 7
   2x = 22
   x = 22 ÷ 2
   x = 11

4. Therefore, x = 11

5. We can verify this by substituting back into the original equation:
   2(11) - 7 = 15
   22 - 7 = 15
   15 = 15 ✓

The solution is x = 11.`;
  }
  
  generateQuickAlgebraSolution(equation) {
    return `Solution: x = 11`;
  }
  
  generateCalculusSolution(equation) {
    // Mock solution for calculus problems
    return `I'll find this derivative step-by-step:

1. Original function: ${equation}

2. For example, if we need to find the derivative of f(x) = sin(x) * e^x:

3. We'll use the product rule: If f(x) = g(x) * h(x), then f'(x) = g'(x) * h(x) + g(x) * h'(x)

4. Let g(x) = sin(x) and h(x) = e^x
   g'(x) = cos(x)
   h'(x) = e^x

5. Applying the product rule:
   f'(x) = cos(x) * e^x + sin(x) * e^x
   f'(x) = e^x * (cos(x) + sin(x))

6. Therefore, the derivative of sin(x) * e^x is e^x * (cos(x) + sin(x))

The solution is f'(x) = e^x * (cos(x) + sin(x)).`;
  }
  
  generateQuickCalculusSolution(equation) {
    return `Solution: f'(x) = e^x * (cos(x) + sin(x))`;
  }
  
  generateConversionSolution(equation) {
    // Mock solution for conversion problems
    return `I'll convert this step-by-step:

1. Original conversion: ${equation}

2. For example, if we need to convert 5 miles to kilometers:

3. The conversion factor is: 1 mile = 1.60934 kilometers

4. Multiply the value by the conversion factor:
   5 miles * 1.60934 km/mile = 8.0467 kilometers

5. Therefore, 5 miles is approximately 8.05 kilometers

The solution is 8.05 kilometers.`;
  }
  
  generateGeometrySolution(equation) {
    // Mock solution for geometry problems
    return `I'll solve this geometry problem step-by-step:

1. Original problem: ${equation}

2. For example, if we need to find the area of a triangle with base 6 and height 8:

3. The formula for the area of a triangle is: Area = (1/2) * base * height

4. Substituting the values:
   Area = (1/2) * 6 * 8
   Area = 3 * 8
   Area = 24

5. Therefore, the area of the triangle is 24 square units

The solution is 24 square units.`;
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('aiTip');
    
    if (tipElement) {
      tipElement.textContent = this.sarcasticTips[randomIndex];
      
      // Add fade-in animation
      tipElement.classList.remove('fade-in');
      void tipElement.offsetWidth; // Trigger reflow
      tipElement.classList.add('fade-in');
    }
  }
  
  // History methods
  addToHistory(equation, result) {
    this.history.addEntry(equation, result);
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
      historyItem.setAttribute('data-equation', entry.calculation);
      
      const calculationElement = document.createElement('div');
      calculationElement.className = 'history-calculation';
      calculationElement.textContent = this.truncateText(entry.calculation, 50);
      
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
  
  truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  formatTimestamp(timestamp) {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
}

// Initialize AI calculator when hub.js loads the AI calculator
document.addEventListener('DOMContentLoaded', () => {
  // The AI calculator will be initialized when selected in the hub
  window.aiCalculator = new AICalculator();
});
