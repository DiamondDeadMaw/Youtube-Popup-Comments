var url;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status == "complete") {
        url = tab.url;
        if (url.includes("youtube.com/watch?v")) {
            chrome.scripting.executeScript({
                files: ['contentScript.js'],
                target: {tabId: tab.id}
            });
        }
    }
})