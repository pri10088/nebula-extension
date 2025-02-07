document.addEventListener("DOMContentLoaded", function () {
  const bookmarkInput = document.getElementById("bookmark-url");
  const addBookmarkBtn = document.getElementById("add-bookmark");
  const bookmarkList = document.getElementById("bookmark-list");

  // Load stored bookmarks
  chrome.storage.sync.get("bookmarks", function (data) {
    if (data.bookmarks) {
      data.bookmarks.forEach(addBookmarkToUI);
    }
  });

  // Function to add a bookmark
  function addBookmark(url) {
    if (!url) return;
    chrome.storage.sync.get("bookmarks", function (data) {
      let bookmarks = data.bookmarks || [];
      bookmarks.push(url);
      chrome.storage.sync.set({ bookmarks }, function () {
        addBookmarkToUI(url);
      });
    });
  }

  // Function to display bookmark in UI
  function addBookmarkToUI(url) {
    const linkElement = document.createElement("a");
    linkElement.href = url;
    linkElement.target = "_blank";
    linkElement.className = "button is-light is-rounded m-1";
    linkElement.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${url}" style="width:16px; margin-right:5px;"> ${
      new URL(url).hostname
    }`;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "button is-danger is-small ml-2";
    deleteBtn.innerText = "X";
    deleteBtn.onclick = function () {
      removeBookmark(url, linkElement);
    };

    const div = document.createElement("div");
    div.className = "bookmark-item";
    div.appendChild(linkElement);
    div.appendChild(deleteBtn);

    bookmarkList.appendChild(div);
  }

  // Function to remove a bookmark
  // Function to remove a bookmark
  function removeBookmark(url, element) {
    chrome.storage.sync.get("bookmarks", function (data) {
      let bookmarks = data.bookmarks || [];
      let updatedBookmarks = bookmarks.filter((b) => b !== url);
      chrome.storage.sync.set({ bookmarks: updatedBookmarks }, function () {
        element.parentElement.remove(); // Remove the entire .bookmark-item div
      });
    });
  }

  // Add bookmark on button click
  addBookmarkBtn.addEventListener("click", function () {
    addBookmark(bookmarkInput.value.trim());
    bookmarkInput.value = "";
  });
});
