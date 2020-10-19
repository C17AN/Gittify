/*global chrome */
let cnt = 0;
const checkNewNotification = () => {
  chrome.storage.local.set({ signIn: false });
};

setInterval(checkNewNotification, 5000);
