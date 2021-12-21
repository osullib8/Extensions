chrome.runtime.sendMessage({command: "post", data:"Test Data"}, (response) => {
    showData(response.data);
  });
