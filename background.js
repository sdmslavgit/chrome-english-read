chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readSelection",
    title: "Read selected text in English",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "readSelection") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: readSelectedText
    });
  }
});

function readSelectedText() {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText.length > 0) {
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = 'en-GB';
    utterance.rate = 1.0; 
    speechSynthesis.speak(utterance);
  } else {
    alert("No text selected.");
  }
}
