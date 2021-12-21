console.log("back running");

chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab) {
    console.log("Clicked");
    let msg ={
        txt: "hello"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}