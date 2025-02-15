// background.js

// Map to keep track of refresh interval timers per tab
const refreshTimers = {};

// Listen for start/stop messages from popup
browser.runtime.onMessage.addListener((message, sender) => {
  const tabId = message.tabId;
  if (message.command === 'start' && tabId) {
    const intervalMinutes = message.interval;
    // Clear any existing timer on this tab to avoid duplicates
    if (refreshTimers[tabId]) {
      clearInterval(refreshTimers[tabId]);
    }
    // Set up a new interval to reload the tab every X minutes
    refreshTimers[tabId] = setInterval(() => {
      browser.tabs.reload(tabId);  // refresh the tab
    }, intervalMinutes * 60 * 1000);
  } 
  else if (message.command === 'stop' && tabId) {
    // Clear the interval if it exists for this tab
    if (refreshTimers[tabId]) {
      clearInterval(refreshTimers[tabId]);
      delete refreshTimers[tabId];
    }
  }
});

// Stop auto-refresh if the tab is closed
browser.tabs.onRemoved.addListener((closedTabId) => {
  if (refreshTimers[closedTabId]) {
    clearInterval(refreshTimers[closedTabId]);
    delete refreshTimers[closedTabId];
  }
});

// (Optional) Stop auto-refresh if user switches to a different tab
browser.tabs.onActivated.addListener((activeInfo) => {
  // activeInfo.tabId is the newly active tab in the window
  // Find any timers in the same window that are no longer active
  const newActiveId = activeInfo.tabId;
  const windowId = activeInfo.windowId;
  // Iterate through timers to find tabs in this window that aren't active anymore
  for (const tabId in refreshTimers) {
    // We need to get the window of each tab with a timer
    browser.tabs.get(Number(tabId)).then(tab => {
      if (tab.windowId === windowId && tab.id !== newActiveId) {
        // A refresh timer was running in this window on a tab that is now inactive
        clearInterval(refreshTimers[tab.id]);
        delete refreshTimers[tab.id];
      }
    });
  }
});

