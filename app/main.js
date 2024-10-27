function calcSum(val1, val2, val3) {
    return 10 - ((val1 ?? 0) + (val2 ?? 0) + (val3 ?? 0));
}

function addValToNode(elem, val) {
    elem.textContent = val ?? 0;
}

document.addEventListener("DOMContentLoaded", () => {
    const applied_connects = document.getElementById("appliedConnects");
    const existing_connects = document.getElementById("existingConnects");
    const professional_connects = document.getElementById("professionalContacts");
    const no_actions = document.getElementById("noActions");

    const final_report = document.getElementById("when_connecting");

    chrome.storage.local.get("scrapedData", (result) => {
        final_report.style.display = "none";
        addValToNode(applied_connects, result?.totalApplied);
        addValToNode(existing_connects, result?.totalExistingConnects);
        addValToNode(professional_connects, result?.totalProfessionalConnects);
        addValToNode(no_actions, calcSum(result?.totalApplied, result?.totalExistingConnects, result?.totalProfessionalConnects));
    });

    chrome.storage.onChanged.addListener((changes, areaName) => {
        if (areaName === "local" && changes.scrapedData) {
            final_report.style.display = "none";
            const dispVal = changes.scrapedData.newValue;
            addValToNode(applied_connects, dispVal.totalApplied);
            addValToNode(existing_connects, dispVal.totalExistingConnects);
            addValToNode(professional_connects, dispVal.totalProfessionalConnects);
            addValToNode(no_actions, calcSum(dispVal.totalApplied, dispVal.totalExistingConnects, dispVal.totalProfessionalConnects));

            final_report.style.display = "block";
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
