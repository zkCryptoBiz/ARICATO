// c0m1n6500nc0m1n6500nc0m1n6500nc0m1n6500nc0m1n6500n

document.addEventListener("DOMContentLoaded", function () {
  //      ---------------------------    Video logic      --------------------------- //
  const loading = document.getElementById("loading");
  const content = document.getElementById("content");
  const video = document.getElementById("videoElement");
  const playButton = document.getElementById("playButton");
  const pauseButton = document.getElementById("pauseButton");
  const transElements = document.querySelectorAll(".trans");
  let starting = true;

  video.addEventListener("canplaythrough", handleCanPlayThrough);

  function handleCanPlayThrough() {
    console.log("Video loaded");
    loading.style.display = "none";
    content.style.display = "flex";
    video.currentTime = video.duration - 5;

    video.removeEventListener("canplaythrough", handleCanPlayThrough);
  }

  playButton.addEventListener("click", function () {
    if (starting) {
      video.currentTime = 0;
      video.muted = false;
      starting = false;
    }
    video.play();
    video.muted = false;
    playButton.style.display = "none";
    pauseButton.style.display = "block";

    transElements.forEach((el) => {
      el.style.opacity = 0.3;
    });
  });

  function pauseVideo() {
    video.pause();
    pauseButton.style.display = "none";
    playButton.style.display = "block";

    transElements.forEach((el) => {
      el.style.opacity = 1;
    });
  }

  pauseButton.addEventListener("click", function () {
    pauseVideo();
  });

  video.addEventListener("ended", function () {
    // video.currentTime = 0;
    playButton.style.display = "block";
    pauseButton.style.display = "none";

    transElements.forEach((el) => {
      el.style.opacity = 1;
    });
  });

  //   ---------------------------     COPY LOGIC     --------------------------- //
  const copyButton = document.getElementById("copyButton");
  const ca = document.getElementById("ca");
  const copyText = document.getElementById("copyText");
  const copied = document.getElementById("copied");

  const copyButton2 = document.getElementById("copyButton2");
  const ca2 = document.getElementById("ca2");
  const copyText2 = document.getElementById("copyText2");
  const copied2 = document.getElementById("copied2");

  function copier(copyButton, ca, copyText, copied) {
    const text = copyText.textContent;
    console.log("Copied to clipboard: ", text);

    navigator.clipboard
      .writeText(text)
      .then(function () {
        ca.style.opacity = 0;
        copied.style.display = "block";

        setTimeout(function () {
          ca.style.opacity = 1;
          copied.style.display = "none";
          copyButton.blur();
        }, 1800);
      })
      .catch(function (err) {
        console.error("Failed to copy text: ", err);
      });
  }

  copyButton.addEventListener("click", function () {
    copier(copyButton, ca, copyText, copied);
  });

  copyButton2.addEventListener("click", function () {
    copier(copyButton2, ca2, copyText2, copied2);
  });

  //   ---------------------------     MODALS     --------------------------- //
  const aboutButton = document.getElementById("about-btn");
  const aboutButton2 = document.getElementById("about-btn2");
  const aboutSection = document.getElementById("about-section");
  // const tokenButton = document.getElementById("token-btn");
  // const tokenSection = document.getElementById("token-section");
  const closeButtons = document.querySelectorAll(".close");
  let modalOpen = false;

  aboutButton.addEventListener("click", function () {
    showAbout();
  });
  aboutButton2.addEventListener("click", function () {
    showAbout();
  });

  function showAbout() {
    if (modalOpen) {
      aboutSection.style.display = "none";
      // tokenSection.style.display = "none";
      modalOpen = false;
    } else {
      pauseVideo();
      // tokenSection.style.display = "none";
      aboutSection.style.display = "flex";
      modalOpen = true;
    }
  }

  // tokenButton.addEventListener("click", function () {
  //   pauseVideo();
  //   aboutSection.style.display = "none";
  //   tokenSection.style.display = "flex";
  // });

  closeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      aboutSection.style.display = "none";
      // tokenSection.style.display = "none";
      modalOpen = false;
    });
  });

  //   ---------------------------     MOBILE MENU    --------------------------- //
  const mobileMenu = document.getElementById("mobile-menu");
  const menuButton = document.getElementById("menu-button");
  const closeMenuButton = document.getElementById("menu-close");

  menuButton.addEventListener("click", function () {
    mobileMenu.style.display = "flex";
    closeMenuButton.style.display = "flex";
    menuButton.style.display = "none";
    pauseVideo();
  });

  closeMenuButton.addEventListener("click", function () {
    mobileMenu.style.display = "none";
    closeMenuButton.style.display = "none";
    menuButton.style.display = "flex";
  });

  // Handle screen orientation change or resize
  function handleResize() {
    if (window.innerWidth >= 1168) {
      mobileMenu.style.display = "none";
      closeMenuButton.style.display = "none";
      menuButton.style.display = "none";
    } else {
      mobileMenu.style.display = "none";
      closeMenuButton.style.display = "none";
      menuButton.style.display = "flex";
    }
  }

  window.addEventListener("resize", handleResize);
  window.addEventListener("orientationchange", handleResize);
});
