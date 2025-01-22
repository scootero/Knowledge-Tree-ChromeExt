// popup.js

document.addEventListener("DOMContentLoaded", () => {
  const historyList = document.getElementById("historyList");

  // Fetch the browsing history
  const now = new Date();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  chrome.history.search(
    { text: "", startTime: sevenDaysAgo, maxResults: 50 },
    (results) => {
      results.forEach((item) => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${item.url}" target="_blank">${
          item.title || item.url
        }</a>`;
        historyList.appendChild(li);
      });
    }
  );
});
