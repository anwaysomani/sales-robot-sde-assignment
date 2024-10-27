function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function transmit(connected_contacts, already_connected_contacts, follow_contacts) {
    chrome.runtime.sendMessage({
        type: "SCRAPED_DATA",
        data: {
            totalApplied: connected_contacts,
            totalExistingConnects: already_connected_contacts,
            totalProfessionalConnects: follow_contacts,
        }
    });
}

async function scrapeData() {
    let connected_contacts = 0;
    let already_connected_contacts = 0;
    let follow_contacts = 0;

    const actionButtons = document.querySelectorAll('.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view');

    for (const element of actionButtons) {
        const d_text = element.textContent.trim();
        if (d_text === 'Connect') {
            await sleep(1000);
            element.click();
            await sleep(1000);
            const sendInviteWithoutNote = document.querySelectorAll('.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1');

            if (sendInviteWithoutNote.length > 0) {
                sendInviteWithoutNote[0].click();
                connected_contacts += 1;
                transmit(connected_contacts, already_connected_contacts, follow_contacts);
            }
        } else if (d_text === 'Message') {
            already_connected_contacts += 1;
            transmit(connected_contacts, already_connected_contacts, follow_contacts);
        } else if (d_text === 'Follow') {
            follow_contacts += 1;
            transmit(connected_contacts, already_connected_contacts, follow_contacts);
        }
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TRIGGER_SCRAPE") {
        scrapeData();
    }
});