// popup.js

// Get references to DOM elements
const intervalInput = document.getElementById('interval');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');

// Helper to get the current active tab ID (returns a promise)
function getActiveTabId() {
  return browser.tabs.query({ active: true, currentWindow: true })
    .then(tabs => (tabs[0] ? tabs[0].id : null));
}

// Start button handler
startBtn.addEventListener('click', () => {
  const minutes = parseFloat(intervalInput.value);
  if (!minutes || minutes <= 0) {
    return;  // Ignore invalid values
  }
  getActiveTabId().then(tabId => {
    if (tabId) {
      // Send message to background script to start auto-refresh
      browser.runtime.sendMessage({ command: 'start', tabId: tabId, interval: minutes });
      window.close();  // Close the popup after starting
    }
  });
});

// Stop button handler
stopBtn.addEventListener('click', () => {
  getActiveTabId().then(tabId => {
    if (tabId) {
      // Send message to background to stop auto-refresh
      browser.runtime.sendMessage({ command: 'stop', tabId: tabId });
      window.close();
    }
  });
});

