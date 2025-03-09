chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "readSlowly",
    title: "Odsłuchaj zaznaczony tekst po angielsku (wolno)",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "readSlowly") {
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
    utterance.rate = 1.0; // Wolniejsze tempo – możesz dostosować wartość
    speechSynthesis.speak(utterance);
  } else {
    alert("Brak zaznaczonego tekstu.");
  }
}

