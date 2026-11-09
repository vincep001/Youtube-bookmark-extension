chrome.tabs.chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("youtube.come/watch")) {
        const queryParameters= tab.url.split("?")[1];
        const urlParameters = new URLSearchParams(queryParameters);
        
    }