document.addEventListener("DOMContentLoaded", function () {
  const twitterLinks = document.querySelectorAll(".twitter");
  const telegramLinks = document.querySelectorAll(".telegram");
  const dexLinks = document.querySelectorAll(".dex");
  const contractAddresses = document.querySelectorAll(".contract-address");
  const aboutText = document.querySelector(".about-pg");
  const timers = document.querySelectorAll(".timer");
  const soon = document.querySelectorAll(".soon");

  fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
      twitterLinks.forEach((link) => {
        link.href = data.twitter;
      });

      telegramLinks.forEach((link) => {
        link.href = data.telegram;
      });

      dexLinks.forEach((link) => {
        link.href = data.dex;
      });

      contractAddresses.forEach((span) => {
        span.textContent = data.contract;
      });

      aboutText.textContent = data.about;

      const launchEpochTime = parseInt(data.launchTime, 10);
      const launchTime = new Date(launchEpochTime * 1000);

      // Start the countdown timer
      const interval = setInterval(
        () => updateCountdown(launchTime, interval),
        1000
      );
    })
    .catch((error) => console.error("Error fetching JSON data:", error));

  //    ------------------------------  COUNTDOWN TIMER    -----------------------------//

  function getTimeDifference(launchTime) {
    const now = Date.now();
    const difference = launchTime - now;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, difference };
  }

  function formatCountdown({ days, hours, minutes, seconds }) {
    return `${days}d ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  function isCountdownFinished({ difference }) {
    return difference <= 0;
  }

  function updateCountdown(launchTime, interval) {
    const timeDifference = getTimeDifference(launchTime);

    if (isCountdownFinished(timeDifference)) {
      console.log("The wait is over!");
      document.getElementById("copyButton").style.display = "flex";
      document.getElementById("copyButton2").style.display = "flex";
      timers.forEach((el) => {
        el.style.display = "none";
      });
      soon.forEach((el) => {
        el.style.display = "none";
      });
      clearInterval(interval);
    } else {
      const countdownString = formatCountdown(timeDifference);
      timers.forEach((el) => {
        el.textContent = countdownString;
      });
    }
  }
});
