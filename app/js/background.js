chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "SCRAPED_DATA") {
        chrome.storage.local.set({ scrapedData: message.data }, () => {
            // logged successfully
        });
    }
});
