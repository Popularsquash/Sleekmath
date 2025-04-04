// Content expansion for the Sleekmath calculator application

document.addEventListener('DOMContentLoaded', function() {
    // Expand sarcastic one-liners with rotation functionality
    expandSarcasticOneLiners();
    
    // Add share calculator feature
    addShareCalculatorFeature();
    
    // Add feedback mechanism for calculator suggestions
    addCalculatorSuggestionFeature();
});

function expandSarcasticOneLiners() {
    // Get the updateSarcasticMessage function from hub.js
    const originalUpdateSarcasticMessage = window.updateSarcasticMessage;
    
    // If the function doesn't exist, create it
    if (!originalUpdateSarcasticMessage) {
        return;
    }
    
    // Expanded collection of sarcastic one-liners
    const expandedMessages = {
        basic: [
            "Welcome to the calculator that judges your math skills silently.",
            "For when counting on your fingers just isn't cutting it anymore.",
            "Making simple arithmetic look complicated since 2025.",
            "Because your phone's calculator app was just too straightforward.",
            "Congratulations on outsourcing your brain's most basic function."
        ],
        scientific: [
            "For when you want to feel smarter than you actually are.",
            "Pretend you understand these functions. We won't tell anyone.",
            "Making you look like a genius since 2025.",
            "Because regular calculators aren't complicated enough.",
            "Now you can pretend to understand what cosine actually means."
        ],
        financial: [
            "Making money decisions with this? Good luck with that.",
            "Calculate exactly how broke you are with precision.",
            "Helping you pretend you understand compound interest.",
            "For when you want to feel bad about your financial decisions in detail.",
            "Turning your money anxiety into exact numbers since 2025."
        ],
        bmi: [
            "The calculator that judges your body, so other people don't have to.",
            "Quantifying your self-esteem issues since 2025.",
            "Turning your body image issues into a precise number.",
            "Because you needed another reason to feel bad about that donut.",
            "Scientifically proving what your mirror already told you."
        ],
        mortgage: [
            "Calculate how long you'll be eating ramen to afford a house.",
            "Turning your homeownership dreams into a 30-year nightmare.",
            "Helping you realize you'll never financially recover from this.",
            "For when you want to cry about housing prices with exact figures.",
            "Calculating your debt-to-despair ratio with precision."
        ],
        sleep: [
            "Find out exactly how sleep-deprived you are. Spoiler: very.",
            "Calculating the minimum sleep you need to function like a human.",
            "For when you want to quantify your exhaustion.",
            "Helping you rationalize that fourth cup of coffee.",
            "Scientifically proving you should have gone to bed earlier."
        ],
        snow: [
            "Calculate your odds of a snow day. Spoiler: You're still going to work.",
            "Quantifying your weather-related disappointment since 2025.",
            "For when you need to know exactly how false your hope is.",
            "Calculating the probability of your boss caring about the snow: 0%.",
            "Turning your weather anxiety into precise percentages."
        ],
        calorie: [
            "The calculator that makes you regret that second donut.",
            "Quantifying your guilt, one calorie at a time.",
            "For when you want to feel bad about yourself with scientific precision.",
            "Turning your food choices into judgment since 2025.",
            "Because you needed another reason to skip dessert."
        ],
        ai: [
            "When you're too lazy to solve it yourself, let AI do it.",
            "For when you've given up on understanding math entirely.",
            "Outsourcing your thinking to algorithms since 2025.",
            "Because your brain deserves a vacation from thinking.",
            "Making human intelligence obsolete, one calculation at a time."
        ],
        dating: [
            "Calculating your dating success probability: Error. Divide by zero.",
            "For when you need scientific proof of your romantic failures.",
            "Quantifying your loneliness with mathematical precision.",
            "Turning your love life into depressing statistics since 2025.",
            "Because your dating life needed to be analyzed with algorithms."
        ],
        excuse: [
            "Generate excuses that are slightly more believable than 'my dog ate it'.",
            "For when your creativity for lying has reached its limit.",
            "Helping you avoid responsibility since 2025.",
            "Because honesty is overrated and deadlines are suggestions.",
            "Turning your procrastination into plausible deniability."
        ],
        procrastination: [
            "Calculate how long you can put things off before actual panic.",
            "For when you need to optimize your procrastination schedule.",
            "Scientifically determining the last possible moment to start working.",
            "Turning your poor time management into an exact science.",
            "Because deadlines are just suggestions until the final hour."
        ],
        meeting: [
            "Find out how much of your life is wasted in meetings. It's depressing.",
            "Calculating the exact cost of your boss's love for pointless discussions.",
            "For when you need proof that this meeting could have been an email.",
            "Quantifying workplace productivity loss since 2025.",
            "Because you needed data to support your meeting hatred."
        ]
    };
    
    // Override the updateSarcasticMessage function
    window.updateSarcasticMessage = function(calculatorType) {
        const sarcasticMessage = document.getElementById('sarcasticMessage');
        if (!sarcasticMessage) return;
        
        // Get the array of messages for this calculator type
        const messagesArray = expandedMessages[calculatorType] || expandedMessages.basic;
        
        // Get a random message from the array
        const randomIndex = Math.floor(Math.random() * messagesArray.length);
        const message = messagesArray[randomIndex];
        
        // Update the message
        sarcasticMessage.textContent = message;
    };
    
    // Add rotation functionality - change message every 30 seconds
    setInterval(function() {
        // Get the current active calculator type
        const activeCalculator = document.querySelector('.calculator-type.active');
        if (activeCalculator) {
            const calculatorType = activeCalculator.getAttribute('data-calculator');
            window.updateSarcasticMessage(calculatorType);
        }
    }, 30000);
}

function addShareCalculatorFeature() {
    // Create share button
    const shareButton = document.createElement('button');
    shareButton.className = 'share-button';
    shareButton.innerHTML = '<i class="fas fa-share-alt"></i> Share';
    shareButton.title = 'Share this calculator';
    
    // Style the button
    shareButton.style.position = 'absolute';
    shareButton.style.top = '10px';
    shareButton.style.right = '10px';
    shareButton.style.padding = '5px 10px';
    shareButton.style.backgroundColor = 'var(--equals-button-bg)';
    shareButton.style.color = 'var(--equals-button-text)';
    shareButton.style.border = 'none';
    shareButton.style.borderRadius = '5px';
    shareButton.style.cursor = 'pointer';
    shareButton.style.fontSize = '0.9rem';
    shareButton.style.zIndex = '10';
    
    // Add event listener to share button
    shareButton.addEventListener('click', function() {
        showShareModal();
    });
    
    // Add button to page
    const hubHeader = document.querySelector('.hub-header');
    if (hubHeader) {
        hubHeader.style.position = 'relative';
        hubHeader.appendChild(shareButton);
    }
}

function showShareModal() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    
    // Create modal header
    const header = document.createElement('h2');
    header.textContent = 'Share Calculator';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--text-color)';
    
    // Get current URL
    const currentUrl = window.location.href;
    
    // Create share options
    const shareOptions = document.createElement('div');
    shareOptions.style.display = 'flex';
    shareOptions.style.flexDirection = 'column';
    shareOptions.style.gap = '15px';
    shareOptions.style.marginTop = '20px';
    
    // Create URL input
    const urlContainer = document.createElement('div');
    urlContainer.style.display = 'flex';
    urlContainer.style.alignItems = 'center';
    urlContainer.style.gap = '10px';
    
    const urlInput = document.createElement('input');
    urlInput.type = 'text';
    urlInput.value = currentUrl;
    urlInput.readOnly = true;
    urlInput.style.flex = '1';
    urlInput.style.padding = '8px';
    urlInput.style.borderRadius = '5px';
    urlInput.style.border = '1px solid var(--border-color)';
    
    const copyUrlButton = document.createElement('button');
    copyUrlButton.textContent = 'Copy';
    copyUrlButton.style.padding = '8px 15px';
    copyUrlButton.style.backgroundColor = 'var(--button-bg)';
    copyUrlButton.style.border = 'none';
    copyUrlButton.style.borderRadius = '5px';
    copyUrlButton.style.cursor = 'pointer';
    
    urlContainer.appendChild(urlInput);
    urlContainer.appendChild(copyUrlButton);
    
    // Create social share buttons
    const socialButtons = document.createElement('div');
    socialButtons.style.display = 'flex';
    socialButtons.style.justifyContent = 'center';
    socialButtons.style.gap = '15px';
    socialButtons.style.marginTop = '10px';
    
    const socialPlatforms = [
        { name: 'Facebook', icon: 'fa-facebook-f', color: '#3b5998' },
        { name: 'Twitter', icon: 'fa-twitter', color: '#1da1f2' },
        { name: 'LinkedIn', icon: 'fa-linkedin-in', color: '#0077b5' },
        { name: 'WhatsApp', icon: 'fa-whatsapp', color: '#25d366' },
        { name: 'Email', icon: 'fa-envelope', color: '#dd4b39' }
    ];
    
    socialPlatforms.forEach(platform => {
        const button = document.createElement('button');
        button.className = 'social-share-button';
        button.innerHTML = `<i class="fab ${platform.icon}"></i>`;
        button.title = `Share on ${platform.name}`;
        button.style.width = '40px';
        button.style.height = '40px';
        button.style.borderRadius = '50%';
        button.style.backgroundColor = platform.color;
        button.style.color = '#fff';
        button.style.border = 'none';
        button.style.fontSize = '1.2rem';
        button.style.cursor = 'pointer';
        button.style.display = 'flex';
        button.style.justifyContent = 'center';
        button.style.alignItems = 'center';
        
        // Add event listener
        button.addEventListener('click', function() {
            let shareUrl = '';
            
            switch(platform.name) {
                case 'Facebook':
                    shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'Twitter':
                    shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent('Check out this awesome calculator!')}`;
                    break;
                case 'LinkedIn':
                    shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
                    break;
                case 'WhatsApp':
                    shareUrl = `https://wa.me/?text=${encodeURIComponent('Check out this awesome calculator: ' + currentUrl)}`;
                    break;
                case 'Email':
                    shareUrl = `mailto:?subject=${encodeURIComponent('Check out this awesome calculator')}&body=${encodeURIComponent('I found this cool calculator that you might like: ' + currentUrl)}`;
                    break;
            }
            
            if (shareUrl) {
                window.open(shareUrl, '_blank');
            }
        });
        
        socialButtons.appendChild(button);
    });
    
    // Add event listener to copy button
    copyUrlButton.addEventListener('click', function() {
        urlInput.select();
        document.execCommand('copy');
        
        // Show success message
        copyUrlButton.textContent = 'Copied!';
        copyUrlButton.style.backgroundColor = 'var(--equals-button-bg)';
        copyUrlButton.style.color = 'var(--equals-button-text)';
        
        // Reset after 2 seconds
        setTimeout(() => {
            copyUrlButton.textContent = 'Copy';
            copyUrlButton.style.backgroundColor = 'var(--button-bg)';
            copyUrlButton.style.color = '';
        }, 2000);
    });
    
    // Assemble share options
    shareOptions.appendChild(urlContainer);
    shareOptions.appendChild(socialButtons);
    
    // Assemble modal
    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(shareOptions);
    
    // Add modal to backdrop
    backdrop.appendChild(modal);
    
    // Add backdrop to page
    document.body.appendChild(backdrop);
    
    // Add event listeners for closing modal
    closeButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
    });
    
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            document.body.removeChild(backdrop);
        }
    });
}

function addCalculatorSuggestionFeature() {
    // Create suggestion button
    const suggestionButton = document.createElement('button');
    suggestionButton.className = 'suggestion-button';
    suggestionButton.innerHTML = '<i class="fas fa-lightbulb"></i> Suggest Calculator';
    suggestionButton.title = 'Suggest a new calculator type';
    
    // Style the button
    suggestionButton.style.backgroundColor = 'var(--calculator-bg)';
    suggestionButton.style.color = 'var(--text-color)';
    suggestionButton.style.border = '1px solid var(--border-color)';
    suggestionButton.style.borderRadius = '5px';
    suggestionButton.style.padding = '10px 15px';
    suggestionButton.style.margin = '20px auto';
    suggestionButton.style.display = 'block';
    suggestionButton.style.cursor = 'pointer';
    suggestionButton.style.fontSize = '0.9rem';
    
    // Add event listener
    suggestionButton.addEventListener('click', function() {
        showSuggestionModal();
    });
    
    // Add button to page
    const calculatorSelector = document.querySelector('.calculator-selector');
    if (calculatorSelector) {
        calculatorSelector.parentNode.insertBefore(suggestionButton, calculatorSelector.nextSibling);
    }
}

function showSuggestionModal() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    
    // Create modal header
    const header = document.createElement('h2');
    header.textContent = 'Suggest a Calculator';
    
    // Create close button
    const closeButton = document.createElement('button');
    closeButton.textContent = '×';
    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '15px';
    closeButton.style.border = 'none';
    closeButton.style.background = 'none';
    closeButton.style.fontSize = '24px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.color = 'var(--text-color)';
    
    // Create form
    const form = document.createElement('form');
    form.id = 'suggestion-form';
    
    // Create form fields
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Your Name:';
    nameLabel.style.display = 'block';
    nameLabel.style.marginBottom = '5px';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'suggestion-name';
    nameInput.style.width = '100%';
    nameInput.style.padding = '8px';
    nameInput.style.marginBottom = '15px';
    nameInput.style.borderRadius = '5px';
    nameInput.style.border = '1px solid var(--border-color)';
    nameInput.style.backgroundColor = 'var(--calculator-bg)';
    nameInput.style.color = 'var(--text-color)';
    
    const calculatorLabel = document.createElement('label');
    calculatorLabel.textContent = 'Calculator Type:';
    calculatorLabel.style.display = 'block';
    calculatorLabel.style.marginBottom = '5px';
    
    const calculatorInput = document.createElement('input');
    calculatorInput.type = 'text';
    calculatorInput.id = 'suggestion-calculator';
    calculatorInput.placeholder = 'e.g., Tip Calculator, Currency Converter';
    calculatorInput.style.width = '100%';
    calculatorInput.style.padding = '8px';
    calculatorInput.style.marginBottom = '15px';
    calculatorInput.style.borderRadius = '5px';
    calculatorInput.style.border = '1px solid var(--border-color)';
    calculatorInput.style.backgroundColor = 'var(--calculator-bg)';
    calculatorInput.style.color = 'var(--text-color)';
    
    const descriptionLabel = document.createElement('label');
    descriptionLabel.textContent = 'Description:';
    descriptionLabel.style.display = 'block';
    descriptionLabel.style.marginBottom = '5px';
    
    const descriptionInput = document.createElement('textarea');
    descriptionInput.id = 'suggestion-description';
    descriptionInput.placeholder = 'Describe what this calculator should do...';
    descriptionInput.style.width = '100%';
    descriptionInput.style.padding = '8px';
    descriptionInput.style.marginBottom = '15px';
    descriptionInput.style.borderRadius = '5px';
    descriptionInput.style.border = '1px solid var(--border-color)';
    descriptionInput.style.backgroundColor = 'var(--calculator-bg)';
    descriptionInput.style.color = 'var(--text-color)';
    descriptionInput.style.minHeight = '100px';
    descriptionInput.style.resize = 'vertical';
    
    const sarcasticLabel = document.createElement('label');
    sarcasticLabel.textContent = 'Suggested Sarcastic One-Liner:';
    sarcasticLabel.style.display = 'block';
    sarcasticLabel.style.marginBottom = '5px';
    
    const sarcasticInput = document.createElement('input');
    sarcasticInput.type = 'text';
    sarcasticInput.id = 'suggestion-sarcastic';
    sarcasticInput.placeholder = 'e.g., "For when you need to calculate exactly how cheap you are."';
    sarcasticInput.style.width = '100%';
    sarcasticInput.style.padding = '8px';
    sarcasticInput.style.marginBottom = '15px';
    sarcasticInput.style.borderRadius = '5px';
    sarcasticInput.style.border = '1px solid var(--border-color)';
    sarcasticInput.style.backgroundColor = 'var(--calculator-bg)';
    sarcasticInput.style.color = 'var(--text-color)';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit Suggestion';
    submitButton.style.backgroundColor = 'var(--equals-button-bg)';
    submitButton.style.color = 'var(--equals-button-text)';
    submitButton.style.border = 'none';
    submitButton.style.borderRadius = '5px';
    submitButton.style.padding = '10px 15px';
    submitButton.style.cursor = 'pointer';
    submitButton.style.width = '100%';
    
    // Assemble form
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(calculatorLabel);
    form.appendChild(calculatorInput);
    form.appendChild(descriptionLabel);
    form.appendChild(descriptionInput);
    form.appendChild(sarcasticLabel);
    form.appendChild(sarcasticInput);
    form.appendChild(submitButton);
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('suggestion-name').value;
        const calculator = document.getElementById('suggestion-calculator').value;
        
        // Show success message
        modal.innerHTML = '';
        
        const successHeader = document.createElement('h2');
        successHeader.textContent = 'Suggestion Received!';
        
        const successMessage = document.createElement('p');
        successMessage.textContent = `Thanks ${name || 'anonymous user'} for suggesting the ${calculator || 'new'} calculator! We'll pretend to consider adding it to our collection.`;
        
        const sarcasticNote = document.createElement('p');
        sarcasticNote.textContent = 'Your suggestion has been filed in our "Maybe Someday" folder, which we check approximately once every never.';
        sarcasticNote.style.fontStyle = 'italic';
        sarcasticNote.style.marginTop = '20px';
        
        const closeModalButton = document.createElement('button');
        closeModalButton.textContent = 'Close';
        closeModalButton.style.backgroundColor = 'var(--equals-button-bg)';
        closeModalButton.style.color = 'var(--equals-button-text)';
        closeModalButton.style.border = 'none';
        closeModalButton.style.borderRadius = '5px';
        closeModalButton.style.padding = '10px 15px';
        closeModalButton.style.cursor = 'pointer';
        closeModalButton.style.width = '100%';
        closeModalButton.style.marginTop = '20px';
        
        closeModalButton.addEventListener('click', function() {
            document.body.removeChild(backdrop);
        });
        
        modal.appendChild(successHeader);
        modal.appendChild(successMessage);
        modal.appendChild(sarcasticNote);
        modal.appendChild(closeModalButton);
    });
    
    // Assemble modal
    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(form);
    
    // Add modal to backdrop
    backdrop.appendChild(modal);
    
    // Add backdrop to page
    document.body.appendChild(backdrop);
    
    // Add event listeners for closing modal
    closeButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
    });
    
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            document.body.removeChild(backdrop);
        }
    });
}
