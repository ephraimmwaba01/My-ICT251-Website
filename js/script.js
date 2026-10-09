/* ==========================================================
   ICT251 personal website - JavaScript
   Feature 1 (compulsory): contact form validation and preview
   ========================================================== */

/* ---------- Contact form validation and preview ---------- */

// Returns true when a value is empty or contains only spaces/tabs/new lines.
function isBlank(value) {
  return value.trim() === "";
}

// Returns true when the text looks like name@domain.tld (no spaces).
function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

// Shows an error message under a field and marks the field as invalid.
function showError(input, message) {
  var errorBox = document.getElementById(input.id + "-error");
  errorBox.textContent = message;
  input.setAttribute("aria-invalid", "true");
}

// Removes the error message and invalid state from a field.
function clearError(input) {
  var errorBox = document.getElementById(input.id + "-error");
  errorBox.textContent = "";
  input.removeAttribute("aria-invalid");
}

// Checks one field. Returns true if it is valid, otherwise shows an error.
function validateField(input) {
  var value = input.value;

  if (input.id === "name" && isBlank(value)) {
    showError(input, "Please enter your name (spaces alone are not enough).");
    return false;
  }
  if (input.id === "email") {
    if (isBlank(value)) {
      showError(input, "Please enter your email address.");
      return false;
    }
    if (!isValidEmail(value)) {
      showError(input, "Please enter a valid email, for example name@example.com.");
      return false;
    }
  }
  if (input.id === "message" && isBlank(value)) {
    showError(input, "Please write a message (spaces alone are not enough).");
    return false;
  }

  clearError(input);
  return true;
}

// Fills the on-page summary using textContent so typed text is never run as HTML.
function showPreview(form) {
  document.getElementById("preview-name").textContent = form.elements["name"].value.trim();
  document.getElementById("preview-email").textContent = form.email.value.trim();
  document.getElementById("preview-topic").textContent =
    form.topic.options[form.topic.selectedIndex].text;
  document.getElementById("preview-message").textContent = form.message.value.trim();
  document.getElementById("form-preview").hidden = false;
}

// Runs when the form is submitted: validates, then shows a local preview.
function handleContactSubmit(event) {
  event.preventDefault(); // keep everything local, no page reload
  var form = event.target;
  var fields = [form.elements["name"], form.email, form.message];
  var firstInvalid = null;

  fields.forEach(function (field) {
    if (!validateField(field) && firstInvalid === null) {
      firstInvalid = field;
    }
  });

  if (firstInvalid) {
    document.getElementById("form-preview").hidden = true;
    firstInvalid.focus();
    return;
  }
  showPreview(form);
}

// Connects the form events once the page has loaded (script is deferred).
function initContactForm() {
  var form = document.getElementById("contact-form");
  if (!form) { return; }

  form.addEventListener("submit", handleContactSubmit);

  // Clear a field's error as soon as the visitor starts correcting it.
  [form.elements["name"], form.email, form.message].forEach(function (field) {
    field.addEventListener("input", function () {
      if (field.hasAttribute("aria-invalid")) { validateField(field); }
    });
  });
}

/* ---------- Feature 2: Mobile navigation ---------- */

// Opens/closes the menu on narrow screens and keeps aria-expanded in sync.
function initMobileNav() {
  var nav = document.querySelector("nav");
  var toggle = document.getElementById("nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (!nav || !toggle || !menu) { return; }
  var label = toggle.querySelector(".nav-toggle-label");

  // Applies the open or closed state to the nav, the button text and ARIA.
  function setOpen(isOpen) {
    nav.classList.toggle("nav-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    label.textContent = isOpen ? "Close menu" : "Menu";
  }

  toggle.addEventListener("click", function () {
    setOpen(!nav.classList.contains("nav-open"));
  });

  // Close the menu after choosing a section link.
  menu.addEventListener("click", function (event) {
    if (event.target.closest("a")) { setOpen(false); }
  });

  // Escape closes the menu and returns focus to the button.
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && nav.classList.contains("nav-open")) {
      setOpen(false);
      toggle.focus();
    }
  });

  // Reset when the window becomes wide again.
  window.addEventListener("resize", function () {
    if (window.innerWidth > 600) { setOpen(false); }
  });
}

/* ---------- Feature 3: Gallery viewer (Previous / Next) ---------- */

// Shows one photo and caption at a time; Previous/Next wrap around at the ends.
function initGallery() {
  var gallery = document.querySelector(".gallery");
  var controls = document.getElementById("gallery-controls");
  var prevButton = document.getElementById("gallery-prev");
  var nextButton = document.getElementById("gallery-next");
  var status = document.getElementById("gallery-status");
  if (!gallery || !controls || !prevButton || !nextButton || !status) { return; }

  var photos = Array.prototype.slice.call(gallery.querySelectorAll("figure"));
  if (photos.length < 2) { return; }
  var current = 0;

  // Displays the photo at a position; going past either end wraps to the other.
  function showPhoto(index) {
    current = (index + photos.length) % photos.length;
    photos.forEach(function (figure, i) {
      figure.hidden = (i !== current);
    });
    status.textContent = "Photo " + (current + 1) + " of " + photos.length;
  }

  gallery.classList.add("is-viewer");
  controls.hidden = false;
  prevButton.addEventListener("click", function () { showPhoto(current - 1); });
  nextButton.addEventListener("click", function () { showPhoto(current + 1); });
  showPhoto(0);
}

/* ---------- Feature 4: Theme switch (light / dark) ---------- */

var THEME_KEY = "ict251-theme";

// Reads the saved theme; returns null if storage is unavailable.
function getSavedTheme() {
  try { return localStorage.getItem(THEME_KEY); } catch (error) { return null; }
}

// Saves the theme; silently ignored if storage is blocked.
function saveTheme(theme) {
  try { localStorage.setItem(THEME_KEY, theme); } catch (error) { /* optional feature */ }
}

// Sets the theme on the page and updates the button text.
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  var button = document.getElementById("theme-toggle");
  if (button) { button.textContent = (theme === "dark") ? "Light mode" : "Dark mode"; }
}

// Starts from the saved or system theme, then toggles on each click.
function initThemeSwitch() {
  var button = document.getElementById("theme-toggle");
  if (!button) { return; }

  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(getSavedTheme() || (prefersDark ? "dark" : "light"));

  button.addEventListener("click", function () {
    var isDark = document.documentElement.getAttribute("data-theme") === "dark";
    var next = isDark ? "light" : "dark";
    applyTheme(next);
    saveTheme(next);
  });
}

/* ---------- Start everything ---------- */
document.documentElement.classList.add("js-enabled"); // lets CSS know JavaScript is running
initContactForm();
initMobileNav();
initGallery();
initThemeSwitch();
