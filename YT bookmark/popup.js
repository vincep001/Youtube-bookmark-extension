// this is for adding bookmark new rows to our popup
import { getActiveTabURL } from "./utils.js";

const addNewBookmark = () => {
    const bookmarkTitleElemet = document.createdElement("div");
    const controlsElemet = document.createdElement("div");
    const newBookmarkElement = document.createdElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";
    controlsElement.className = "bookmark-controls";

    setBookmarkAttributes("play", onplay, controlsElement);
    setBookmarkAttributes("delete", onDelete, controlsElement);

    newBookmarkElement.id = "bookmark" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookElement.setAttribute("timestamp", bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    
}




// const addNewBookmark = () => {};

// const viewBookmarks = () => {};