// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed!");
});

// Function to fetch history in pages (with pagination)
function fetchHistoryPage(start = 0, results = []) {
  const now = new Date();
  const tenYearsAgo = now.getTime() - 10 * 365 * 24 * 60 * 60 * 1000; // 10 years ago in milliseconds

  chrome.history.search(
    { text: "", startTime: tenYearsAgo, maxResults: 1000, start: start },
    (data) => {
      if (data.length > 0) {
        results.push(...data);
        console.log(`Fetched ${data.length} entries...`);

        // If more results are available, fetch the next page
        fetchHistoryPage(start + 1000, results);
      } else {
        // After pagination, sort by last visit time and log all entries
        console.log(
          `Finished fetching history. Total entries: ${results.length}`
        );
        results.sort((a, b) => a.lastVisitTime - b.lastVisitTime); // Sort by the last visit time
        results.forEach((entry) => {
          console.log(
            `Title: ${entry.title || "No Title"}, URL: ${
              entry.url
            }, Last Visit: ${new Date(entry.lastVisitTime)}`
          );
        });
      }
    }
  );
}

// Start fetching the history starting from the first page
chrome.action.onClicked.addListener(() => {
  fetchHistoryPage();
});
