# Auto Refresh Tab – Firefox Extension
Auto Refresh Tab is a minimal Firefox extension that refreshes the current browser tab at a specified time interval. It provides a simple popup interface for setting the interval (in minutes) and starting or stopping the refresh.

## Features
* Lightweight UI – A single popup with an input field and Start/Stop buttons.
* Per-Tab Refresh – Only refreshes the currently active tab when started.
* Minimal Permissions – Uses just the activeTab permission.
* No Persistence – The refresh interval does not persist across browser restarts.
* No Noise – No notifications or sounds; it simply reloads the page in the background.

## Installation (Temporary)
Since this extension is primarily for personal use or testing, you can install it temporarily in Firefox:

1. Clone or Download this repository.
2. Open Firefox and go to:
```kotlin
about:debugging#/runtime/this-firefox
```
(Or open about:debugging and select This Firefox in the sidebar.)
3. Click Load Temporary Add-on….
4. Select the manifest.json file from the folder where you cloned this project.
The extension will now appear in the Firefox toolbar.

**Note**: Temporary add-ons are removed when Firefox restarts. You will need to reload it each time if you want to keep using it.

## Usage
1. Click the Auto Refresh Tab icon in the Firefox toolbar to open the popup.
2. Enter the refresh interval in minutes (e.g., 5 for five minutes).
3. Click Start to begin automatic reloading of the current tab.
4. Click Stop to end the auto-refresh.
If you close or switch tabs, the refresh timer for that tab is automatically cleared.

## File Overview
manifest.json – Defines the extension’s metadata, permissions, and scripts.
popup.html – Contains the popup’s user interface layout (input, buttons).
popup.js – Handles interactions in the popup (e.g., sending start/stop messages).
background.js – Maintains the refresh timers and reloads tabs on schedule.
icons/ – Directory for extension icons (optional).

## License
This project is licensed under the MIT License. You’re free to use and modify it for your own purposes.

Happy auto-refreshing!
