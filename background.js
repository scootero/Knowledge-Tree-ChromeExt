// background.js

// Log the browsing history for the last 7 days
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// Fetch browsing history when the extension is clicked
chrome.action.onClicked.addListener(() => {
  const now = new Date();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  // Use the history API to fetch visited pages
  chrome.history.search(
    { text: "", startTime: sevenDaysAgo, maxResults: 100 },
    (results) => {
      console.log("Browsing History:");
      results.forEach((item) => {
        console.log(
          `Title: ${item.title}, URL: ${item.url}, Last Visit: ${new Date(
            item.lastVisitTime
          )}`
        );
      });
    }
  );
});
