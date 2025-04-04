// AdSense optimization for the Sleekmath calculator application

document.addEventListener('DOMContentLoaded', function() {
    // Add premium toggle for ad-free experience
    addPremiumToggle();
    
    // Make ad containers responsive
    makeAdContainersResponsive();
    
    // Add mobile-specific ads
    addMobileAds();
    
    // Add premium features promotion
    addPremiumPromo();
});

function addPremiumToggle() {
    // Create premium toggle container
    const toggleContainer = document.createElement('div');
    toggleContainer.className = 'premium-toggle-container';
    
    // Create toggle label
    const toggleLabel = document.createElement('span');
    toggleLabel.className = 'premium-toggle-label';
    toggleLabel.textContent = 'Ad-Free Mode';
    
    // Create premium badge
    const premiumBadge = document.createElement('span');
    premiumBadge.className = 'premium-badge';
    premiumBadge.textContent = 'Premium';
    premiumBadge.style.display = 'none';
    
    // Create toggle switch
    const toggle = document.createElement('label');
    toggle.className = 'premium-toggle';
    
    const toggleInput = document.createElement('input');
    toggleInput.type = 'checkbox';
    
    const toggleSlider = document.createElement('span');
    toggleSlider.className = 'premium-toggle-slider';
    
    // Assemble toggle
    toggle.appendChild(toggleInput);
    toggle.appendChild(toggleSlider);
    
    toggleContainer.appendChild(toggleLabel);
    toggleContainer.appendChild(toggle);
    toggleContainer.appendChild(premiumBadge);
    
    // Add toggle to page
    const calculatorHubContainer = document.querySelector('.calculator-hub-container');
    if (calculatorHubContainer) {
        calculatorHubContainer.insertBefore(toggleContainer, calculatorHubContainer.firstChild);
    }
    
    // Add event listener to toggle
    toggleInput.addEventListener('change', function() {
        if (this.checked) {
            // Show premium features modal
            showPremiumFeaturesModal();
        } else {
            // Remove ad-free mode
            document.body.classList.remove('ad-free-mode');
            premiumBadge.style.display = 'none';
        }
    });
}

function showPremiumFeaturesModal() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    
    // Create modal header
    const header = document.createElement('h2');
    header.textContent = 'Upgrade to Premium';
    
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
    
    // Create modal content
    const content = document.createElement('div');
    content.innerHTML = `
        <p>Upgrade to Premium for an ad-free experience and exclusive features:</p>
        <ul>
            <li>Remove all advertisements</li>
            <li>Access to advanced calculator functions</li>
            <li>Save calculation history</li>
            <li>Custom themes and personalization</li>
            <li>Priority support</li>
        </ul>
        <p><strong>Price: $4.99/month</strong></p>
    `;
    
    // Create buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';
    buttonContainer.style.marginTop = '20px';
    
    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Maybe Later';
    cancelButton.style.flex = '1';
    cancelButton.style.padding = '10px';
    cancelButton.style.border = 'none';
    cancelButton.style.borderRadius = '5px';
    cancelButton.style.backgroundColor = '#ccc';
    cancelButton.style.cursor = 'pointer';
    
    const upgradeButton = document.createElement('button');
    upgradeButton.textContent = 'Activate Premium';
    upgradeButton.style.flex = '1';
    upgradeButton.style.padding = '10px';
    upgradeButton.style.border = 'none';
    upgradeButton.style.borderRadius = '5px';
    upgradeButton.style.backgroundColor = 'var(--equals-button-bg)';
    upgradeButton.style.color = 'var(--equals-button-text)';
    upgradeButton.style.cursor = 'pointer';
    
    // Assemble button container
    buttonContainer.appendChild(cancelButton);
    buttonContainer.appendChild(upgradeButton);
    
    // Assemble modal
    modal.appendChild(closeButton);
    modal.appendChild(header);
    modal.appendChild(content);
    modal.appendChild(buttonContainer);
    
    // Add modal to backdrop
    backdrop.appendChild(modal);
    
    // Add backdrop to page
    document.body.appendChild(backdrop);
    
    // Add event listeners
    closeButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        // Uncheck premium toggle
        const toggleInput = document.querySelector('.premium-toggle input');
        if (toggleInput) {
            toggleInput.checked = false;
        }
    });
    
    cancelButton.addEventListener('click', function() {
        document.body.removeChild(backdrop);
        // Uncheck premium toggle
        const toggleInput = document.querySelector('.premium-toggle input');
        if (toggleInput) {
            toggleInput.checked = false;
        }
    });
    
    upgradeButton.addEventListener('click', function() {
        // Simulate premium activation
        document.body.classList.add('ad-free-mode');
        document.body.removeChild(backdrop);
        
        // Show premium badge
        const premiumBadge = document.querySelector('.premium-badge');
        if (premiumBadge) {
            premiumBadge.style.display = 'inline-block';
        }
        
        // Show success message
        alert('Premium features activated! Enjoy your ad-free experience.');
    });
    
    backdrop.addEventListener('click', function(e) {
        if (e.target === backdrop) {
            document.body.removeChild(backdrop);
            // Uncheck premium toggle
            const toggleInput = document.querySelector('.premium-toggle input');
            if (toggleInput) {
                toggleInput.checked = false;
            }
        }
    });
}

function makeAdContainersResponsive() {
    // Find all ad containers
    const adContainers = document.querySelectorAll('.ad-container');
    
    adContainers.forEach(container => {
        // Add ad label
        const adLabel = document.createElement('span');
        adLabel.className = 'ad-label';
        adLabel.textContent = 'Advertisement';
        container.appendChild(adLabel);
        
        // Make container responsive based on screen size
        if (container.classList.contains('sidebar-ad')) {
            // Adjust sidebar ad height based on screen height
            const adjustSidebarAdHeight = () => {
                const viewportHeight = window.innerHeight;
                const maxHeight = Math.min(600, viewportHeight * 0.7);
                container.style.minHeight = `${maxHeight}px`;
            };
            
            // Initial adjustment
            adjustSidebarAdHeight();
            
            // Adjust on resize
            window.addEventListener('resize', adjustSidebarAdHeight);
        }
    });
}

function addMobileAds() {
    // Create mobile-specific ad container
    const mobileAd = document.createElement('div');
    mobileAd.className = 'ad-container mobile-ad';
    
    // Add ad label
    const adLabel = document.createElement('span');
    adLabel.className = 'ad-label';
    adLabel.textContent = 'Advertisement';
    
    // Add placeholder text
    const placeholderText = document.createElement('div');
    placeholderText.textContent = 'Advertisement';
    placeholderText.style.display = 'flex';
    placeholderText.style.justifyContent = 'center';
    placeholderText.style.alignItems = 'center';
    placeholderText.style.height = '100%';
    placeholderText.style.color = '#777';
    
    // Assemble mobile ad
    mobileAd.appendChild(adLabel);
    mobileAd.appendChild(placeholderText);
    
    // Add mobile ad to page
    const calculatorContent = document.querySelector('.calculator-content');
    if (calculatorContent) {
        calculatorContent.parentNode.insertBefore(mobileAd, calculatorContent.nextSibling);
    }
}

function addPremiumPromo() {
    // Create premium promo container
    const premiumPromo = document.createElement('div');
    premiumPromo.className = 'premium-promo';
    
    // Create promo header
    const promoHeader = document.createElement('div');
    promoHeader.className = 'premium-promo-header';
    
    const promoTitle = document.createElement('h3');
    promoTitle.className = 'premium-promo-title';
    promoTitle.textContent = 'Upgrade to Premium';
    
    const promoBadge = document.createElement('span');
    promoBadge.className = 'premium-promo-badge';
    promoBadge.textContent = 'Premium';
    
    promoHeader.appendChild(promoTitle);
    promoHeader.appendChild(promoBadge);
    
    // Create promo features
    const promoFeatures = document.createElement('ul');
    promoFeatures.className = 'premium-promo-features';
    
    const features = [
        'Ad-free experience',
        'Advanced calculator functions',
        'Save calculation history',
        'Custom themes',
        'Priority support'
    ];
    
    features.forEach(feature => {
        const featureItem = document.createElement('li');
        featureItem.className = 'premium-promo-feature';
        featureItem.textContent = feature;
        promoFeatures.appendChild(featureItem);
    });
    
    // Create promo button
    const promoButton = document.createElement('button');
    promoButton.className = 'premium-promo-button';
    promoButton.textContent = 'Upgrade Now';
    
    // Add event listener to button
    promoButton.addEventListener('click', function() {
        // Trigger premium toggle
        const toggleInput = document.querySelector('.premium-toggle input');
        if (toggleInput) {
            toggleInput.checked = true;
            toggleInput.dispatchEvent(new Event('change'));
        }
    });
    
    // Assemble premium promo
    premiumPromo.appendChild(promoHeader);
    premiumPromo.appendChild(promoFeatures);
    premiumPromo.appendChild(promoButton);
    
    // Add premium promo to page
    const historyPanel = document.querySelector('.history-panel');
    if (historyPanel) {
        historyPanel.appendChild(premiumPromo);
    }
}
