document.addEventListener("DOMContentLoaded", () => {
    const appliedConnects = document.getElementById("appliedConnects");

    chrome.storage.local.get("scrapedData", (result) => {
        appliedConnects.textContent = result?.totalApplied ?? '';
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === "local" && changes.scrapedData) {
            const newTotalApplied = changes.scrapedData.newValue?.totalApplied ?? '';
            appliedConnects.textContent = newTotalApplied;
        }
    });
});

document.getElementById("start_connecting").addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tabId = tabs[0].id;

        chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: ["content.js"]
        }, () => {
            chrome.tabs.sendMessage(tabId, { type: "TRIGGER_SCRAPE" });
        });
    });
});
