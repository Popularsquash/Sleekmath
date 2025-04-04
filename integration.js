// Integration script for all calculator improvements

document.addEventListener('DOMContentLoaded', function() {
    // Add CSS files
    addStylesheet('/css/styles.css');
    addStylesheet('/calculator-improvements/enhanced-responsive.css');
    addStylesheet('/calculator-improvements/footer.css');
    addStylesheet('/calculator-improvements/interface-enhancements.css');
    addStylesheet('/calculator-improvements/adsense-optimization.css');
    addStylesheet('/calculator-improvements/content-expansion.css');
    
    // Load JavaScript improvements
    loadScript('/calculator-improvements/footer.js');
    loadScript('/calculator-improvements/interface-enhancements.js');
    loadScript('/calculator-improvements/adsense-optimization.js');
    loadScript('/calculator-improvements/content-expansion.js');
    
    console.log('Calculator improvements loaded successfully!');
});

// Function to add a stylesheet to the document
function addStylesheet(href) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
}

// Function to load a script
function loadScript(src) {
    const script = document.createElement('script');
    script.src = src;
    document.body.appendChild(script);
}
