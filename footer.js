// Footer component for the Sleekmath calculator application

document.addEventListener('DOMContentLoaded', function() {
    // Create footer element
    createFooter();
    
    // Add event listeners for footer links
    setupFooterEventListeners();
});

function createFooter() {
    // Check if footer already exists
    if (document.querySelector('.footer')) {
        return;
    }
    
    // Create footer elements
    const footer = document.createElement('footer');
    footer.className = 'footer';
    
    const footerContainer = document.createElement('div');
    footerContainer.className = 'footer-container';
    
    // Create footer links
    const footerLinks = document.createElement('div');
    footerLinks.className = 'footer-links';
    
    // Add links to employees and terms pages
    const employeesLink = document.createElement('a');
    employeesLink.className = 'footer-link';
    employeesLink.href = 'https://fjzrbdmy.manus.space/employees.html';
    employeesLink.textContent = 'Our Team';
    employeesLink.target = '_blank';
    
    const termsLink = document.createElement('a');
    termsLink.className = 'footer-link';
    termsLink.href = 'https://fjzrbdmy.manus.space/terms.html';
    termsLink.textContent = 'Terms & Conditions';
    termsLink.target = '_blank';
    
    // Add privacy policy link
    const privacyLink = document.createElement('a');
    privacyLink.className = 'footer-link';
    privacyLink.href = '#';
    privacyLink.textContent = 'Privacy Policy';
    privacyLink.id = 'privacy-link';
    
    // Add feedback link
    const feedbackLink = document.createElement('a');
    feedbackLink.className = 'footer-link';
    feedbackLink.href = '#';
    feedbackLink.textContent = 'Send Feedback';
    feedbackLink.id = 'feedback-link';
    
    // Add copyright text
    const copyright = document.createElement('div');
    copyright.className = 'footer-copyright';
    
    // Get current year for copyright
    const currentYear = new Date().getFullYear();
    copyright.textContent = `© ${currentYear} Sleekmath. All rights reserved. Calculations may be wildly inaccurate.`;
    
    // Assemble footer
    footerLinks.appendChild(employeesLink);
    footerLinks.appendChild(termsLink);
    footerLinks.appendChild(privacyLink);
    footerLinks.appendChild(feedbackLink);
    
    footerContainer.appendChild(footerLinks);
    footerContainer.appendChild(copyright);
    
    footer.appendChild(footerContainer);
    
    // Add footer to page
    document.body.appendChild(footer);
}

function setupFooterEventListeners() {
    // Add event listener for privacy policy link
    const privacyLink = document.getElementById('privacy-link');
    if (privacyLink) {
        privacyLink.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Privacy Policy: We respect your privacy by not collecting any of your data. We can\'t afford the storage costs anyway.');
        });
    }
    
    // Add event listener for feedback link
    const feedbackLink = document.getElementById('feedback-link');
    if (feedbackLink) {
        feedbackLink.addEventListener('click', function(e) {
            e.preventDefault();
            showFeedbackForm();
        });
    }
}

function showFeedbackForm() {
    // Create modal backdrop
    const backdrop = document.createElement('div');
    backdrop.className = 'modal-backdrop';
    backdrop.style.position = 'fixed';
    backdrop.style.top = '0';
    backdrop.style.left = '0';
    backdrop.style.width = '100%';
    backdrop.style.height = '100%';
    backdrop.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    backdrop.style.zIndex = '1000';
    backdrop.style.display = 'flex';
    backdrop.style.justifyContent = 'center';
    backdrop.style.alignItems = 'center';
    
    // Create modal content
    const modal = document.createElement('div');
    modal.className = 'feedback-modal';
    modal.style.backgroundColor = 'var(--calculator-bg)';
    modal.style.borderRadius = '10px';
    modal.style.padding = '20px';
    modal.style.width = '90%';
    modal.style.maxWidth = '500px';
    modal.style.boxShadow = '0 4px 15px var(--shadow-color)';
    
    // Create modal header
    const header = document.createElement('h2');
    header.textContent = 'Send Feedback';
    header.style.marginTop = '0';
    
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
    form.id = 'feedback-form';
    
    // Create form fields
    const nameLabel = document.createElement('label');
    nameLabel.textContent = 'Name:';
    nameLabel.style.display = 'block';
    nameLabel.style.marginBottom = '5px';
    
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.id = 'feedback-name';
    nameInput.style.width = '100%';
    nameInput.style.padding = '8px';
    nameInput.style.marginBottom = '15px';
    nameInput.style.borderRadius = '5px';
    nameInput.style.border = '1px solid var(--border-color)';
    nameInput.style.backgroundColor = 'var(--calculator-bg)';
    nameInput.style.color = 'var(--text-color)';
    
    const emailLabel = document.createElement('label');
    emailLabel.textContent = 'Email:';
    emailLabel.style.display = 'block';
    emailLabel.style.marginBottom = '5px';
    
    const emailInput = document.createElement('input');
    emailInput.type = 'email';
    emailInput.id = 'feedback-email';
    emailInput.style.width = '100%';
    emailInput.style.padding = '8px';
    emailInput.style.marginBottom = '15px';
    emailInput.style.borderRadius = '5px';
    emailInput.style.border = '1px solid var(--border-color)';
    emailInput.style.backgroundColor = 'var(--calculator-bg)';
    emailInput.style.color = 'var(--text-color)';
    
    const messageLabel = document.createElement('label');
    messageLabel.textContent = 'Feedback:';
    messageLabel.style.display = 'block';
    messageLabel.style.marginBottom = '5px';
    
    const messageInput = document.createElement('textarea');
    messageInput.id = 'feedback-message';
    messageInput.style.width = '100%';
    messageInput.style.padding = '8px';
    messageInput.style.marginBottom = '15px';
    messageInput.style.borderRadius = '5px';
    messageInput.style.border = '1px solid var(--border-color)';
    messageInput.style.backgroundColor = 'var(--calculator-bg)';
    messageInput.style.color = 'var(--text-color)';
    messageInput.style.minHeight = '100px';
    messageInput.style.resize = 'vertical';
    
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Submit Feedback';
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
    form.appendChild(emailLabel);
    form.appendChild(emailInput);
    form.appendChild(messageLabel);
    form.appendChild(messageInput);
    form.appendChild(submitButton);
    
    // Add form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('feedback-name').value;
        alert(`Thanks for your feedback, ${name || 'valued user'}! We'll pretend to read it and maybe even consider implementing your suggestions.`);
        document.body.removeChild(backdrop);
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
