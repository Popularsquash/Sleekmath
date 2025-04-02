// AdSense Integration JavaScript

// This file handles the AdSense integration for the calculator website
// It includes functions for ad initialization, placement optimization,
// and analytics tracking

class AdSenseManager {
  constructor() {
    this.adUnits = {
      headerAd: 'calculator-header-ad',
      sidebarAd: 'calculator-sidebar-ad',
      resultAd: 'calculator-result-ad',
      footerAd: 'calculator-footer-ad'
    };
    
    this.adExclusions = {
      calculatorButtons: '.calculator .buttons',
      inputFields: '.input-field, .input-select',
      actionButtons: '.calculate-btn'
    };
    
    this.init();
  }
  
  init() {
    // Initialize AdSense when the page is fully loaded
    window.addEventListener('load', () => {
      this.loadAdSense();
      this.setupAdExclusions();
      this.trackAdPerformance();
    });
    
    // Track calculator usage for ad optimization
    document.addEventListener('calculatorSelected', (event) => {
      this.trackCalculatorUse(event.detail.calculatorType);
    });
  }
  
  loadAdSense() {
    // Check if AdSense is already loaded
    if (window.adsbygoogle) {
      console.log('AdSense already loaded');
      return;
    }
    
    // Create and append the AdSense Auto Ads script
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX';
    adScript.crossOrigin = 'anonymous';
    document.head.appendChild(adScript);
    
    // Initialize AdSense
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});
    
    console.log('AdSense Auto Ads initialized');
  }
  
  setupAdExclusions() {
    // Create a style element for ad exclusions
    const styleElement = document.createElement('style');
    
    // Build CSS rules for ad exclusions
    let cssRules = '';
    for (const [key, selector] of Object.entries(this.adExclusions)) {
      cssRules += `${selector} .adsbygoogle { display: none !important; }\n`;
    }
    
    // Add CSS rules to the style element
    styleElement.textContent = cssRules;
    document.head.appendChild(styleElement);
    
    console.log('Ad exclusions set up');
  }
  
  createAdUnit(containerId, format = 'auto') {
    // Check if container exists
    const container = document.getElementById(containerId);
    if (!container) {
      console.error(`Ad container ${containerId} not found`);
      return;
    }
    
    // Create ad element
    const adElement = document.createElement('ins');
    adElement.className = 'adsbygoogle';
    adElement.style.display = 'block';
    adElement.setAttribute('data-ad-client', 'ca-pub-XXXXXXXXXXXXXXXX');
    adElement.setAttribute('data-ad-slot', this.getAdSlot(containerId));
    adElement.setAttribute('data-ad-format', format);
    
    if (format === 'auto') {
      adElement.setAttribute('data-full-width-responsive', 'true');
    }
    
    // Clear container and append ad
    container.innerHTML = '';
    container.appendChild(adElement);
    
    // Push ad to AdSense
    (window.adsbygoogle = window.adsbygoogle || []).push({});
    
    // Track ad visibility
    this.trackAdVisibility(containerId);
    
    console.log(`Ad unit created in ${containerId}`);
  }
  
  getAdSlot(containerId) {
    // Map container IDs to ad slots
    const adSlots = {
      'calculator-header-ad': '1234567890',
      'calculator-sidebar-ad': '0987654321',
      'calculator-result-ad': '1357924680',
      'calculator-footer-ad': '2468013579'
    };
    
    return adSlots[containerId] || '1234567890'; // Default slot
  }
  
  // Analytics tracking functions
  trackCalculatorUse(calculatorType) {
    if (window.gtag) {
      gtag('event', 'calculator_use', {
        'calculator_type': calculatorType
      });
      console.log(`Tracked calculator use: ${calculatorType}`);
    }
  }
  
  trackAdVisibility(adUnit) {
    if (window.gtag) {
      gtag('event', 'ad_visible', {
        'ad_unit': adUnit
      });
      console.log(`Tracked ad visibility: ${adUnit}`);
    }
  }
  
  trackAdPerformance() {
    // Set up periodic tracking of ad performance
    if (window.gtag) {
      // Track ad impressions
      document.addEventListener('adsbygoogle-noad', (event) => {
        gtag('event', 'ad_no_fill', {
          'ad_slot': event.detail.adUnit
        });
      });
      
      // Track ad clicks (note: this is a simplified approach, actual clicks are tracked by AdSense)
      document.addEventListener('click', (event) => {
        if (event.target.closest('.adsbygoogle')) {
          gtag('event', 'ad_click', {
            'ad_location': this.getAdLocation(event.target)
          });
        }
      });
    }
  }
  
  getAdLocation(element) {
    // Determine the location of the ad that was clicked
    const container = element.closest('[id]');
    return container ? container.id : 'unknown';
  }
  
  // Methods for manual ad placement
  placeHeaderAd() {
    this.createAdUnit(this.adUnits.headerAd, 'horizontal');
  }
  
  placeSidebarAd() {
    this.createAdUnit(this.adUnits.sidebarAd, 'rectangle');
  }
  
  placeResultAd() {
    this.createAdUnit(this.adUnits.resultAd, 'auto');
  }
  
  placeFooterAd() {
    this.createAdUnit(this.adUnits.footerAd, 'horizontal');
  }
}

// Initialize Google Analytics
function initAnalytics() {
  // Create and append the Google Analytics script
  const gaScript = document.createElement('script');
  gaScript.async = true;
  gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX';
  document.head.appendChild(gaScript);
  
  // Initialize gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
  
  console.log('Google Analytics initialized');
}

// Initialize AdSense and Analytics when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Analytics first
  initAnalytics();
  
  // Initialize AdSense manager
  window.adSenseManager = new AdSenseManager();
  
  console.log('AdSense and Analytics initialization complete');
});
