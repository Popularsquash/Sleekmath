// Multi-Calculator Hub JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize the hub
    const hub = new CalculatorHub();
});

class CalculatorHub {
    constructor() {
        this.calculatorTypes = document.querySelectorAll('.calculator-type');
        this.calculatorContainers = document.querySelectorAll('.calculator-container');
        this.sarcasticMessages = this.getSarcasticMessages();
        this.sarcasticMessageElement = document.getElementById('sarcasticMessage');
        
        this.initEventListeners();
        this.displayRandomSarcasticMessage();
        
        // Initialize the basic calculator (already active by default)
        if (window.calculator === undefined) {
            window.calculator = new Calculator();
        }
    }
    
    initEventListeners() {
        // Add click event listeners to calculator type buttons
        this.calculatorTypes.forEach(type => {
            type.addEventListener('click', () => {
                const calculatorType = type.getAttribute('data-calculator');
                this.switchCalculator(calculatorType);
                this.displayRandomSarcasticMessage();
            });
        });
    }
    
    switchCalculator(calculatorType) {
        // Remove active class from all calculator types and containers
        this.calculatorTypes.forEach(type => {
            type.classList.remove('active');
        });
        
        this.calculatorContainers.forEach(container => {
            container.classList.remove('active');
        });
        
        // Add active class to selected calculator type and container
        const selectedType = document.querySelector(`.calculator-type.${calculatorType}`);
        const selectedContainer = document.getElementById(`${calculatorType}Calculator`);
        
        if (selectedType && selectedContainer) {
            selectedType.classList.add('active');
            selectedContainer.classList.add('active');
        }
        
        // Initialize specific calculator if needed
        // This will be expanded as we implement each calculator type
        switch(calculatorType) {
            case 'basic':
                // Basic calculator is already initialized
                break;
            case 'scientific':
                // Will initialize scientific calculator when implemented
                this.showComingSoonMessage('Scientific Calculator');
                break;
            case 'financial':
                // Will initialize financial calculator when implemented
                this.showComingSoonMessage('Financial Calculator');
                break;
            case 'bmi':
                // Will initialize BMI calculator when implemented
                this.showComingSoonMessage('BMI Calculator');
                break;
            case 'mortgage':
                // Will initialize mortgage calculator when implemented
                this.showComingSoonMessage('Mortgage Calculator');
                break;
            case 'sleep':
                // Will initialize sleep calculator when implemented
                this.showComingSoonMessage('REM Sleep Calculator');
                break;
            case 'snow':
                // Will initialize snow days calculator when implemented
                this.showComingSoonMessage('Snow Days Calculator');
                break;
            case 'calorie':
                // Will initialize calorie calculator when implemented
                this.showComingSoonMessage('Calorie Calculator');
                break;
            case 'ai':
                // Will initialize AI solver when implemented
                this.showComingSoonMessage('AI Math Solver');
                break;
        }
    }
    
    showComingSoonMessage(calculatorName) {
        console.log(`${calculatorName} will be implemented soon.`);
        // This will be expanded with actual implementation for each calculator
    }
    
    displayRandomSarcasticMessage() {
        const activeCalculator = document.querySelector('.calculator-type.active');
        if (!activeCalculator) return;
        
        const calculatorType = activeCalculator.getAttribute('data-calculator');
        const messages = this.sarcasticMessages[calculatorType] || this.sarcasticMessages.general;
        
        const randomIndex = Math.floor(Math.random() * messages.length);
        this.sarcasticMessageElement.textContent = messages[randomIndex];
        
        // Add fade-in animation
        this.sarcasticMessageElement.classList.remove('fade-in');
        void this.sarcasticMessageElement.offsetWidth; // Trigger reflow
        this.sarcasticMessageElement.classList.add('fade-in');
    }
    
    getSarcasticMessages() {
        return {
            general: [
                "Welcome to the calculator that judges your math skills silently.",
                "Math: because counting on your fingers is so last century.",
                "Making simple arithmetic look complicated since 2025.",
                "For when your brain needs a digital crutch.",
                "Because your phone calculator wasn't pretentious enough."
            ],
            basic: [
                "Ah, basic calculator. For basic people with basic needs.",
                "Congratulations on needing help with 2+2.",
                "The calculator your elementary school teacher warned you about.",
                "For when mental math is just too much effort.",
                "Solving problems you could do in your head, but slower."
            ],
            scientific: [
                "Scientific calculator: because you want to look smarter than you are.",
                "Now you can pretend to understand what all these buttons do.",
                "For when you need to calculate something you'll never use in real life.",
                "TI-89 nostalgia without the $100 price tag.",
                "More buttons = more intelligence, obviously."
            ],
            financial: [
                "Calculate exactly how broke you are with precision.",
                "For when you need math to confirm you can't afford that.",
                "Turning your financial anxiety into exact numbers since 2025.",
                "ROI Calculator: Confirming your bad investment decisions with math.",
                "The numbers don't lie, but your budget does."
            ],
            bmi: [
                "BMI Calculator: turning your self-esteem into a number since 1832.",
                "Calculate exactly how much pizza is too much pizza.",
                "For when you need a number to feel bad about yourself.",
                "Mathematically proving why you should have skipped dessert.",
                "The calculator that judges you more than your mother-in-law."
            ],
            mortgage: [
                "Calculate your 30-year commitment to anxiety.",
                "For when you want to know exactly how house-poor you'll be.",
                "Turning the American Dream into a numerical nightmare.",
                "Proving you can't afford that house before the bank does.",
                "Calculating exactly how long you'll be eating ramen."
            ],
            sleep: [
                "Quantifying how much sleep you're not getting.",
                "For when counting sheep is too analog.",
                "Calculate your sleep debt, as if you needed more debt.",
                "Mathematically proving why you're always tired.",
                "REM Calculator: Because even sleep needs to be optimized now."
            ],
            snow: [
                "Calculating your false hope for a day off.",
                "Statistically proving why you should have moved to Florida.",
                "For when you need math to justify your weather complaints.",
                "Calculating the probability of disappointment.",
                "Snow day predictions: less accurate than your local meteorologist."
            ],
            calorie: [
                "Mathematically justifying that extra cookie.",
                "Turning your food guilt into exact numbers.",
                "For when you need to know exactly how much regret to feel.",
                "Calculating how many minutes on the treadmill you're avoiding.",
                "Because eating wasn't complicated enough already."
            ],
            ai: [
                "For when your brain needs a smarter friend.",
                "AI Math Solver: making you feel inferior since 2025.",
                "Let AI solve it because you definitely can't.",
                "When you've given up on understanding math yourself.",
                "Outsourcing your thinking to algorithms, as nature intended."
            ]
        };
    }
}

// Add CSS animation for sarcastic messages
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
        
        .placeholder-text {
            text-align: center;
            font-size: 1.2rem;
            color: var(--text-color);
            margin: 20px 0 10px;
        }
        
        .sarcastic-text {
            text-align: center;
            font-style: italic;
            color: rgba(255, 255, 255, 0.7);
            margin-bottom: 20px;
        }
    `;
    document.head.appendChild(style);
});
