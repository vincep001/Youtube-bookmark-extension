(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    const fetchBookmarks = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get([currentVideo], (obj) => {
                resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
            });
        });
    };

    // chrome.runtime.onMessage.addListener((obj, sender, response) => {
    //     const { type, value, videoId } = obj;

    //     if (type === "NEW") {
    //         currentVideo = videoId;
    //         newVideoLoaded();
    //     }
    // });

    // const newVideoLoaded = () => {

    //     const bookmarkBtnExists = document.getElementById("bookmark-btn")[0];
    //     console.log(bookmarkBtnExists);

    //     if (!bookmarkBtnExists) {
    //         const bookmarkBtn = document.createdElement("img");

    //         bookmarkBtn.src = chrome.runtime.getURL("assets/bookmark.png");
    //         bookmarkBtn.classname = "ytp-button" + "bookmark-btn";
    //         bookmarkBtn.title = "Click to bookmark current timestamp";

    //         youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
    //         youtubePlayer =  document.getElementsByClassName("video-stream")[0];

    //         youtubeLeftControls?.append(bookmarkBtn);
    //         bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);
    //     }
    // }

    /*continuation part 1  */
    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };
        
        currentVideoBookmarks = await fetchBookmarks();

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a,b) => a.time - b.time))
        });
    }; 

    const newVideoLoaded = async () => {
        const bookmarkBtnExists = document.getElementById("bookmark-btn")[0];
        
        currentVideoBookmarks = await fetchBookmarks();

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
    };

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const {type , value, videoId } =obj;

        if (type === "NEW") {
            currentVideo = videoID;
            newVideoLoaded();
        } else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
        } else if ( type === "DELETE") {
            currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
            chrome.storage.sync.set({ [currentVideo]: JSON.stringify(currentVideoBookmarks)});

            response(currentVideoBookmarks);
        }
    }





})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(1);

    return date.toISOString().substr(11, 8);

}