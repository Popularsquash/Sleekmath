// Calculator interface enhancements for the Sleekmath calculator application

document.addEventListener('DOMContentLoaded', function() {
    // Add copy result button to calculator display
    addCopyResultButton();
    
    // Enhance keyboard shortcuts
    enhanceKeyboardShortcuts();
    
    // Add visual feedback for active operations
    enhanceVisualFeedback();
});

function addCopyResultButton() {
    // Find all calculator displays
    const displays = document.querySelectorAll('.display');
    
    displays.forEach(display => {
        // Create copy button
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-result-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy result to clipboard';
        
        // Add event listener to copy button
        copyButton.addEventListener('click', function() {
            const currentOperand = display.querySelector('.current-operand');
            if (currentOperand && currentOperand.textContent) {
                navigator.clipboard.writeText(currentOperand.textContent)
                    .then(() => {
                        // Show success message
                        const originalTitle = copyButton.title;
                        copyButton.title = 'Copied!';
                        copyButton.style.color = 'var(--equals-button-bg)';
                        
                        // Reset after 2 seconds
                        setTimeout(() => {
                            copyButton.title = originalTitle;
                            copyButton.style.color = '';
                        }, 2000);
                    })
                    .catch(err => {
                        console.error('Could not copy text: ', err);
                    });
            }
        });
        
        // Add button to display
        display.appendChild(copyButton);
    });
}

function enhanceKeyboardShortcuts() {
    // Add additional keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Prevent default behavior for calculator keys
        if (
            (e.key >= '0' && e.key <= '9') ||
            e.key === '.' || 
            e.key === '+' || 
            e.key === '-' || 
            e.key === '*' || 
            e.key === '/' || 
            e.key === '=' || 
            e.key === 'Enter' || 
            e.key === 'Escape' || 
            e.key === 'Backspace'
        ) {
            // Don't prevent default if user is typing in an input field
            if (document.activeElement.tagName !== 'INPUT' && 
                document.activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
            }
        }
        
        // Add shortcut for percent (p key)
        if (e.key === 'p' || e.key === 'P') {
            const percentButton = document.querySelector('[data-action="percent"]');
            if (percentButton) {
                percentButton.click();
                e.preventDefault();
            }
        }
        
        // Add shortcut for clear (c key)
        if (e.key === 'c' || e.key === 'C') {
            const clearButton = document.querySelector('[data-action="clear"]');
            if (clearButton) {
                clearButton.click();
                e.preventDefault();
            }
        }
        
        // Add shortcut for calculator type switching (1-9 keys with Alt)
        if (e.altKey && e.key >= '1' && e.key <= '9') {
            const index = parseInt(e.key) - 1;
            const calculatorTypes = document.querySelectorAll('.calculator-type');
            if (calculatorTypes && calculatorTypes[index]) {
                calculatorTypes[index].click();
                e.preventDefault();
            }
        }
    });
}

function enhanceVisualFeedback() {
    // Add visual feedback for button presses
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        // Add ripple effect on click
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            
            // Position the ripple
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            // Style the ripple
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            // Add ripple to button
            button.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add focus indication for keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Add visual feedback for active operations
    const operationButtons = document.querySelectorAll('.operator');
    
    operationButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all operation buttons
            operationButtons.forEach(btn => {
                btn.classList.remove('active-operation');
            });
            
            // Add active class to clicked button
            button.classList.add('active-operation');
        });
    });
    
    // Reset active operation after equals
    const equalsButton = document.querySelector('.equals');
    if (equalsButton) {
        equalsButton.addEventListener('click', function() {
            operationButtons.forEach(btn => {
                btn.classList.remove('active-operation');
            });
        });
    }
}
