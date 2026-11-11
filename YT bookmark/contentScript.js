(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {

        const bookmarkBtnExists = document.getElementById("bookmark-btn")[0];
        console.log(bookmarkBtnExists);

        if (!bookmarkBtnExists) {
            const bookmarkBtn = document.createdElement("img");

            bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
            bookmarkBtn.classname = "ytp-button" + "bookmark-btn";
            bookmarkBtn.title = "Click to bookmark current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer =  document.getElementsByClassName("video-stream")[0];

            youtubeLeftControls?.append(bookmarkBtn);
            bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
        }
    }
    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a,b) => a.time - b.time))
        });


    } "this is the end code snippet"



}