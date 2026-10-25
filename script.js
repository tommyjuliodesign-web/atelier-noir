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
