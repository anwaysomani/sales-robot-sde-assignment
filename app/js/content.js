function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function transmit(connected_contacts, already_connected_contacts, follow_contacts) {
    chrome.runtime.sendMessage({
        type: "SCRAPED_DATA",
        data: {
            totalApplied: connected_contacts,
            totalConnected: already_connected_contacts,
            totalFollowed: follow_contacts,
        }
    });
}

async function scrapeData() {
    let connected_contacts = 0;
    let already_connected_contacts = 0;
    let follow_contacts = 0;

    const actionButtons = document.querySelectorAll('.artdeco-button.artdeco-button--2.artdeco-button--secondary.ember-view');
    // message, connect, follow

    for (const element of actionButtons) {
        console.log(element.textContent.trim());
        const d_text = element.textContent.trim()
        if (dText === 'Connect') {
            await sleep(1000);
            element.click();
            await sleep(1000);
            const sendInviteWithoutNote = document.querySelectorAll('.artdeco-button.artdeco-button--2.artdeco-button--primary.ember-view.ml1');

            if (sendInviteWithoutNote.length > 0) {
                sendInviteWithoutNote[0].click();
                connected_contacts += 1;
                transmit(connected_contacts, already_connected_contacts, follow_contacts);
            }
        } else if (dText === 'Message') {

        }
    }
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "TRIGGER_SCRAPE") {
        scrapeData();
    }
});