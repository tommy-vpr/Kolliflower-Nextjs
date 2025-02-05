document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("age-verification-modal");
  const yesButton = document.getElementById("lt-yes-button");
  const noButton = document.getElementById("lt-no-button");

  // Helper functions
  function getCookie(name) {
    const cookies = document.cookie.split("; ").reduce((acc, cookie) => {
      const [key, value] = cookie.split("=");
      acc[key] = value;
      return acc;
    }, {});
    return cookies[name] || null;
  }

  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ""}${expires}; path=/`;
  }

  function checkCookie() {
    if (!modal) {
      console.warn("Age verification modal not found in the DOM.");
      return;
    }

    const ageVerified = getCookie("ageVerified");

    if (ageVerified) {
      modal.style.display = "none";
    } else {
      modal.style.display = "flex";
    }
  }

  // Event Listeners for buttons
  if (yesButton && noButton) {
    yesButton.addEventListener("click", () => {
      setCookie("ageVerified", "true", 7); // Cookie available for 7 days
      modal.style.display = "none";
    });

    noButton.addEventListener("click", () => {
      window.location.href = "https://www.google.com"; // Redirect if not verified
    });
  } else {
    console.warn("Yes or No button is missing in the DOM.");
  }

  // Initialize the modal check
  checkCookie();
});

gsap.fromTo(
  ".kolliflower-logo",
  { scale: 1 }, // Initial state
  {
    scale: 0.85, // Target state
    duration: 0.5,
    scrollTrigger: {
      trigger: ".main-nav",
      start: "top top", // Start point
      scrub: true,
    },
  }
);
