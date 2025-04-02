// JavaScript for Excuse Generator Calculator

class ExcuseCalculator {
  constructor() {
    this.history = new CalculationHistory(10);
    this.historyListElement = document.getElementById('excuseHistoryList');
    
    this.initEventListeners();
    this.renderHistoryList();
    
    // Sarcastic tips for excuse results
    this.sarcasticTips = [
      "Remember, it's not lying if you convince yourself it's true first.",
      "The best excuse is one that makes you sound responsible while doing the exact opposite.",
      "If you're going to make up an excuse, at least be creative. 'My dog ate my homework' is so last century.",
      "The more detailed your excuse, the more suspicious it sounds. Keep it simple, genius.",
      "Nothing says 'I'm reliable' like having a new excuse every single time.",
      "Pro tip: Save your best excuses for when you really need them. Like retirement.",
      "If all else fails, blame technology. No one understands it anyway.",
      "The art of the excuse is making the other person feel bad for asking you to do the thing in the first place.",
      "Remember: it's not procrastination if you have a good excuse.",
      "Excuses are like opinions - everyone has one, and most of them stink."
    ];
    
    // Excuse templates by category
    this.excuseTemplates = {
      work: [
        "I can't complete that deadline because my {relative} suddenly {disaster} and I need to {action}.",
        "My {device} {malfunction} and I lost all my work. I'll need {timeframe} to redo everything.",
        "I've been {illness} since {timeframe} and my doctor says I need to {restriction}.",
        "There was a {disaster} in my {location} and I've been dealing with {consequence} all day.",
        "My {pet} {pet_action} my {item} and I've spent hours trying to {solution}."
      ],
      social: [
        "I can't make it tonight because I {commitment} that I completely forgot about until just now.",
        "My {relative} surprised me with a visit and I need to {action} with them.",
        "I'm feeling really {symptom} and I think I might be coming down with {illness}.",
        "My {vehicle} {vehicle_problem} on the way and I'm stuck waiting for {service}.",
        "I double-booked myself and promised my {person} I would help them {task} tonight."
      ],
      date: [
        "I need to reschedule because my {ex_relationship} is having a {crisis} and needs my {support}.",
        "I just realized I have a {deadline} for {project} that's due {timeframe}.",
        "My {friend} just went through a {situation} and needs me to {action} with them tonight.",
        "I'm not feeling very {feeling} after {event} and need some time to {self_care}.",
        "My {relative} {unexpected_event} and I need to {family_obligation} immediately."
      ],
      family: [
        "I can't make the family gathering because I'm {illness} and don't want to get everyone sick.",
        "My {boss} just called and I have to {work_emergency} right away.",
        "My {pet}'s {pet_problem} and I need to take them to the {pet_service} immediately.",
        "I'm stuck in {traffic_situation} and it looks like I'll be here for {timeframe}.",
        "My {friend} is having a {crisis} and I'm the only one who can {help_action}."
      ],
      exercise: [
        "I can't work out today because I {injury} my {body_part} while {mundane_activity}.",
        "My {workout_gear} {gear_problem} and I need to {solution} before I can exercise again.",
        "I'm still sore from {previous_activity} and my {body_part} needs another day to recover.",
        "I have a {appointment} that I completely forgot about until just now.",
        "The {weather} is {weather_condition} and it's affecting my {health_condition}."
      ],
      chores: [
        "I can't clean today because I'm {mental_state} after {stressful_event} at work.",
        "My {cleaning_tool} {tool_problem} and I need to {solution} before I can start.",
        "I just realized I have a {deadline} for {project} that's more urgent.",
        "I {injury} my {body_part} earlier and the doctor said I should avoid {movement}.",
        "I promised my {person} I would help them with {favor} and it's taking longer than expected."
      ]
    };
    
    // Fill-in words for excuse templates
    this.excuseWords = {
      relative: ["mother", "father", "grandmother", "grandfather", "aunt", "uncle", "cousin", "sister", "brother", "in-law"],
      disaster: ["fell ill", "had an accident", "got locked out", "lost their wallet", "had their car break down", "flooded their apartment", "lost power"],
      action: ["drive them to the hospital", "help them move", "take care of their pet", "sort out their insurance", "call various services", "provide emotional support"],
      device: ["laptop", "computer", "hard drive", "cloud account", "phone", "tablet"],
      malfunction: ["crashed", "got infected with a virus", "stopped working", "updated and deleted everything", "got hacked", "had a critical error"],
      timeframe: ["a few hours", "the rest of the day", "until tomorrow", "a couple of days", "the weekend", "a week"],
      illness: ["fighting a migraine", "dealing with food poisoning", "battling a stomach bug", "nursing a cold", "coping with allergies", "experiencing back pain"],
      restriction: ["rest", "avoid screens", "stay hydrated", "avoid stress", "take medication", "not exert myself"],
      location: ["neighborhood", "apartment building", "street", "office", "area", "building"],
      consequence: ["insurance calls", "cleanup", "emergency services", "property damage", "paperwork", "relocating temporarily"],
      pet: ["dog", "cat", "hamster", "parrot", "fish", "rabbit"],
      pet_action: ["ate", "destroyed", "hid", "knocked over", "got tangled in", "ran away with"],
      item: ["important documents", "laptop charger", "car keys", "phone", "wallet", "work files"],
      solution: ["find a replacement", "fix it", "recover the data", "get a new one", "file a report", "contact support"],
      commitment: ["have a doctor's appointment", "promised to help a friend move", "need to finish an urgent work project", "have a family obligation", "scheduled a repair person to come by", "have an important call"],
      symptom: ["dizzy", "nauseous", "feverish", "exhausted", "congested", "achy"],
      vehicle: ["car", "bike", "scooter", "motorcycle", "bus", "train"],
      vehicle_problem: ["broke down", "got a flat tire", "won't start", "is making a strange noise", "overheated", "ran out of gas"],
      service: ["a tow truck", "roadside assistance", "a mechanic", "a ride", "a replacement part", "public transportation"],
      person: ["roommate", "neighbor", "colleague", "old friend", "relative", "mentor"],
      task: ["move furniture", "fix their computer", "drive them to an appointment", "review their resume", "prepare for an interview", "assemble furniture"],
      ex_relationship: ["ex", "former colleague", "old roommate", "childhood friend", "distant relative", "previous boss"],
      crisis: ["personal emergency", "car trouble", "health scare", "housing crisis", "job loss", "emotional breakdown"],
      support: ["advice", "help moving", "emotional support", "financial guidance", "technical assistance", "professional expertise"],
      deadline: ["major deadline", "submission", "presentation", "report", "application", "proposal"],
      project: ["work project", "school assignment", "volunteer commitment", "side business", "home renovation", "creative project"],
      friend: ["best friend", "college roommate", "childhood friend", "work friend", "gym buddy", "neighbor"],
      situation: ["breakup", "job loss", "housing crisis", "family emergency", "health scare", "identity theft"],
      feeling: ["social", "well", "myself", "energetic", "up to it", "in the right headspace"],
      event: ["a long day at work", "receiving some bad news", "not sleeping well", "a stressful meeting", "an uncomfortable encounter", "a difficult conversation"],
      self_care: ["rest", "recharge", "process", "meditate", "be alone", "catch up on sleep"],
      unexpected_event: ["suddenly fell ill", "had a minor accident", "needs help with technology", "lost their keys", "needs a ride somewhere", "is feeling lonely"],
      family_obligation: ["visit them", "take them to an appointment", "help them with groceries", "assist with household tasks", "provide technical support", "offer emotional support"],
      boss: ["boss", "manager", "supervisor", "team lead", "client", "director"],
      work_emergency: ["finish a project", "attend an emergency meeting", "fix a critical issue", "handle a client crisis", "complete an urgent task", "address a system failure"],
      pet_problem: ["not eating", "acting strange", "seems sick", "got injured", "escaped from the yard", "destroyed something important"],
      pet_service: ["vet", "emergency animal hospital", "pet store", "groomer", "trainer", "animal behaviorist"],
      traffic_situation: ["terrible traffic", "an accident on the highway", "a road closure", "construction", "a police checkpoint", "a parade route"],
      help_action: ["drive them somewhere", "help them move", "provide emotional support", "assist with a technical problem", "give them advice", "lend them money"],
      injury: ["strained", "pulled", "twisted", "bruised", "overextended", "irritated"],
      body_part: ["back", "knee", "shoulder", "ankle", "wrist", "neck"],
      mundane_activity: ["sleeping", "getting out of bed", "reaching for something", "sitting too long", "carrying groceries", "looking at my phone"],
      workout_gear: ["gym shoes", "workout clothes", "fitness tracker", "gym bag", "water bottle", "exercise equipment"],
      gear_problem: ["got damaged", "went missing", "needs to be replaced", "isn't working properly", "got left at work", "isn't clean"],
      previous_activity: ["yesterday's workout", "moving furniture", "yard work", "playing with my kids", "a new exercise routine", "walking too much"],
      appointment: ["doctor's appointment", "work meeting", "call with a client", "virtual happy hour", "parent-teacher conference", "consultation"],
      weather: ["weather", "barometric pressure", "humidity", "temperature", "pollen count", "air quality"],
      weather_condition: ["terrible", "changing rapidly", "too extreme", "affecting my sinuses", "triggering my allergies", "making me feel off"],
      health_condition: ["joints", "breathing", "energy levels", "motivation", "balance", "coordination"],
      mental_state: ["mentally exhausted", "too stressed", "completely drained", "not in the right headspace", "overwhelmed", "distracted"],
      stressful_event: ["a difficult meeting", "a confrontation", "a tight deadline", "bad news", "a performance review", "a challenging project"],
      cleaning_tool: ["vacuum", "mop", "cleaning supplies", "dishwasher", "washing machine", "duster"],
      tool_problem: ["broke", "ran out", "isn't working properly", "needs maintenance", "got misplaced", "needs to be replaced"],
      movement: ["bending", "lifting", "reaching", "standing for long periods", "repetitive motions", "physical exertion"]
    };
  }
  
  initEventListeners() {
    // Generate excuse button
    document.getElementById('generateExcuse').addEventListener('click', () => {
      this.generateExcuse();
    });
    
    // Believability slider
    const believabilitySlider = document.getElementById('believabilitySlider');
    const believabilityValue = document.getElementById('believabilityValue');
    believabilitySlider.addEventListener('input', () => {
      believabilityValue.textContent = believabilitySlider.value;
    });
    
    // Clear history button
    document.getElementById('clearExcuseHistory').addEventListener('click', () => {
      this.clearHistory();
    });
    
    // History item click to show details
    this.historyListElement.addEventListener('click', (event) => {
      const historyItem = event.target.closest('.history-item');
      if (historyItem) {
        // Could implement a feature to restore excuse inputs from history
        console.log('History item clicked:', historyItem);
      }
    });
  }
  
  generateExcuse() {
    // Get input values
    const excuseType = document.getElementById('excuseType').value;
    const excuseImportance = document.getElementById('excuseImportance').value;
    const believability = parseInt(document.getElementById('believabilitySlider').value);
    const usedBefore = document.getElementById('usedBefore').checked;
    const needEvidence = document.getElementById('needEvidence').checked;
    const includeIllness = document.getElementById('includeIllness').checked;
    
    // Select a template based on excuse type
    const templates = this.excuseTemplates[excuseType];
    let templateIndex = Math.floor(Math.random() * templates.length);
    
    // If they've used excuses before, try to pick a less common template
    if (usedBefore) {
      templateIndex = (templateIndex + 2) % templates.length;
    }
    
    // Get the template
    let excuseTemplate = templates[templateIndex];
    
    // If they want to include illness and the template doesn't already have it, modify it
    if (includeIllness && !excuseTemplate.includes('illness')) {
      excuseTemplate = `I'm feeling really {symptom} and might have {illness}, so I can't ${excuseTemplate.split('I can\'t ')[1]}`;
    }
    
    // Replace template variables with random words
    let excuse = excuseTemplate;
    const matches = excuseTemplate.match(/\{([^}]+)\}/g) || [];
    
    matches.forEach(match => {
      const key = match.replace('{', '').replace('}', '');
      if (this.excuseWords[key]) {
        const options = this.excuseWords[key];
        const replacement = options[Math.floor(Math.random() * options.length)];
        excuse = excuse.replace(match, replacement);
      }
    });
    
    // Calculate excuse quality based on inputs
    let quality = 0;
    
    // Base quality on believability
    quality += believability * 0.7;
    
    // Adjust based on importance
    switch (excuseImportance) {
      case 'low':
        quality += 2;
        break;
      case 'medium':
        quality += 1;
        break;
      case 'high':
        quality -= 1;
        break;
      case 'critical':
        quality -= 2;
        break;
    }
    
    // Adjust for other factors
    if (usedBefore) quality -= 1;
    if (needEvidence) quality += 2;
    if (includeIllness) quality += 1;
    
    // Cap quality between 1 and 10
    quality = Math.max(1, Math.min(10, Math.round(quality)));
    
    // Generate explanation based on quality
    let explanation = '';
    if (quality <= 3) {
      explanation = "This excuse is about as believable as a penguin in the Sahara. You might want to try again.";
    } else if (quality <= 6) {
      explanation = "This excuse might work, but don't be surprised if you get some skeptical looks.";
    } else if (quality <= 8) {
      explanation = "Solid excuse. Most people will buy this without question.";
    } else {
      explanation = "Perfect excuse! Even a lie detector would be fooled by this masterpiece.";
    }
    
    // Add evidence tip if they're willing to fake evidence
    if (needEvidence) {
      const evidenceTips = [
        "Pro tip: Take a screenshot of an 'error message' to really sell this excuse.",
        "Suggestion: Send a picture of your 'broken' item for added credibility.",
        "Insider tip: Create a fake confirmation email to back up your story.",
        "Expert move: Have a friend post something relevant on social media that you can screenshot.",
        "Next level: Change your profile picture to look slightly unwell if using a health excuse."
      ];
      explanation += " " + evidenceTips[Math.floor(Math.random() * evidenceTips.length)];
    }
    
    // Update excuse display
    document.getElementById('excuseQuality').textContent = `${quality}/10`;
    document.getElementById('excuseQualityMeter').style.width = `${quality * 10}%`;
    document.getElementById('excuseText').textContent = excuse;
    document.getElementById('excuseExplanation').textContent = explanation;
    
    // Add to history
    const calculationString = `${excuseType.charAt(0).toUpperCase() + excuseType.slice(1)} excuse, Importance: ${excuseImportance}`;
    const result = `${quality}/10 - "${excuse.substring(0, 40)}..."`;
    this.addToHistory(calculationString, result);
    
    // Update sarcastic tip
    this.updateSarcasticTip();
  }
  
  updateSarcasticTip() {
    const randomIndex = Math.floor(Math.random() * this.sarcasticTips.length);
    const tipElement = document.getElementById('excuseTip');
    
    if (tipElement) {
      tipElement.textContent = this.sarcasticTips[randomIndex];
      
      // Add fade-in animation
      tipElement.classList.remove('fade-in');
      void tipElement.offsetWidth; // Trigger reflow
      tipElement.classList.add('fade-in');
    }
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
      emptyMessage.innerHTML = '<div class="history-calculation">No excuses generated yet</div>';
      this.historyListElement.appendChild(emptyMessage);
      return;
    }
    
    // Create and append history items
    entries.forEach(entry => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      
      const calculationElement = document.createElement('div');
      calculationElement.className = 'history-calculation';
      calculationElement.textContent = entry.calculation;
      
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

// Initialize excuse calculator when hub.js loads the excuse calculator
document.addEventListener('DOMContentLoaded', () => {
  // The excuse calculator will be initialized when selected in the hub
  window.excuseCalculator = new ExcuseCalculator();
});
