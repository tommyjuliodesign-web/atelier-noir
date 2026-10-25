const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const currentYear = document.querySelector("#current-year");

// Mobile navigation
if (menuToggle && navLinks) {
  const setMenu = (open) => {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute(
      "aria-label",
      open ? "Close navigation menu" : "Open navigation menu"
    );
    navLinks.classList.toggle("is-open", open);
  };

  const isOpen = () => navLinks.classList.contains("is-open");

  menuToggle.addEventListener("click", () => setMenu(!isOpen()));

  // Close the menu after selecting a section
  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Close the menu when switching back to desktop width
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) setMenu(false);
  });

  // Close the menu with the Escape key and return focus to the button
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && isOpen()) {
      setMenu(false);
      menuToggle.focus();
    }
  });

  // Close the menu when tapping outside the header
  document.addEventListener("click", (event) => {
    if (isOpen() && !event.target.closest(".site-header")) setMenu(false);
  });
}

// Keep the footer year current
if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

// Header edge once the page has scrolled
const siteHeader = document.querySelector(".site-header");

if (siteHeader) {
  const updateHeader = () =>
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);

  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

// Mark the current section in the navigation
const navSectionLinks = Array.from(
  document.querySelectorAll('.nav-links > a[href^="#"]:not(.nav-cta)')
);
const navSections = navSectionLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if (navSections.length) {
  const updateActiveLink = () => {
    const point = window.scrollY + window.innerHeight * 0.35;
    let current = navSections[0];

    navSections.forEach((section) => {
      if (section.offsetTop <= point) current = section;
    });

    // At the very bottom the last section is current, even if it is short
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = navSections[navSections.length - 1];
    }

    navSectionLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current.id}`;
      link.classList.toggle("is-active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  };

  window.addEventListener("scroll", updateActiveLink, { passive: true });
  window.addEventListener("resize", updateActiveLink);
  updateActiveLink();
}

// Open the story photo once, when it first comes into view
const storyImage = document.querySelector(".story-image");

if (storyImage) {
  if ("IntersectionObserver" in window) {
    const storyObserver = new IntersectionObserver(
      (entries, observer) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          storyImage.classList.add("is-in");
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    storyObserver.observe(storyImage);
  } else {
    storyImage.classList.add("is-in");
  }
}
