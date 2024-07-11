// src/utils/adBlocker.js

export function initializeAdBlocker(videoPlayer) {
    if (!videoPlayer) {
      console.error("Video player element not found.");
      return;
    }
  
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.target.classList.contains("ad-showing")) {
          videoPlayer.playbackRate = 16;
          var skipButton = videoPlayer.querySelector(".ytp-ad-skip-button.ytp-button");
          if (skipButton) {
            skipButton.click();
          }
        }
      });
    });
  
    observer.observe(videoPlayer, {
      attributes: true,
      attributeFilter: ["class"]
    });
  }
  