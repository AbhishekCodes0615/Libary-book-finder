// Toggle sidebar visibility (small screens)
window.toggleMenu = function toggleMenu() {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('menuBtn');
  const overlay = document.getElementById('sidebarOverlay');

  if (!sb || !btn) return;

  const isHidden = sb.classList.contains('hide');

  if (isHidden) {
    sb.classList.remove('hide');
    sb.setAttribute('aria-hidden', 'false');
    btn.setAttribute('aria-expanded', 'true');
    if (overlay) {
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden', 'false');
    }
    // set focus to sidebar for accessibility
    sb.focus?.();
  } else {
    sb.classList.add('hide');
    sb.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
    }
    // return focus to menu button
    btn.focus?.();
  }
};

// wire up the static overlay to close the sidebar when clicked
(function initOverlayListener() {
  const overlay = document.getElementById('sidebarOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const btn = document.getElementById('menuBtn');
    if (sb && !sb.classList.contains('hide')) {
      sb.classList.add('hide');
      sb.setAttribute('aria-hidden', 'true');
    }
    if (btn) btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    btn?.focus?.();
  });
})();

// Accessibility: close sidebar on Escape
document.addEventListener('keydown', (e) => {
  const sb = document.getElementById('sidebar');
  const btn = document.getElementById('menuBtn');
  const overlay = document.getElementById('sidebarOverlay');
  if (!sb) return;
  if (e.key === 'Escape' && !sb.classList.contains('hide')) {
    sb.classList.add('hide');
    sb.setAttribute('aria-hidden', 'true');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    if (overlay) overlay.classList.remove('show');
  }
});

// On resize ensure state is consistent
window.addEventListener('resize', () => {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const btn = document.getElementById('menuBtn');

  if (!sb) return;

  if (window.innerWidth > 992) {
    // show sidebar on large screens
    sb.classList.remove('hide');
    sb.setAttribute('aria-hidden', 'false');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
    }
    if (btn) btn.setAttribute('aria-expanded', 'false');
  } else {
    // keep sidebar hidden by default on small screens
    if (!sb.classList.contains('hide')) {
      // leave as-is if user opened it
    } else {
      sb.classList.add('hide');
      sb.setAttribute('aria-hidden', 'true');
    }
  }
});

// Highlight active menu item
const setupMenuHighlight = () => {
  const menuItems = document.querySelectorAll(".sidebar ul li");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      // if on small screen, close sidebar after selecting
      if (window.innerWidth <= 992) {
        const sb = document.getElementById('sidebar');
        const btn = document.getElementById('menuBtn');
        const overlay = document.getElementById('sidebarOverlay');
        if (sb) sb.classList.add('hide');
        if (btn) btn.setAttribute('aria-expanded', 'false');
        if (overlay) overlay.classList.remove('show');
      }
    });
  });
};
setupMenuHighlight();

// Search box handling (guarded if input missing)
const searchInput = document.querySelector(".search-box input");
if (searchInput) {
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      let query = searchInput.value.trim();
      if (query) {
        alert(`Searching for: "${query}"`);
        searchInput.value = "";
      }
    }
  });
}

// Hover effect for user profile (guarded)
const userBox = document.querySelector(".user");
if (userBox) {
  userBox.addEventListener("mouseenter", () => {
    userBox.style.backgroundColor = "#c9eac7";
  });
  userBox.addEventListener("mouseleave", () => {
    userBox.style.backgroundColor = "#e1f2e0";
  });
}

// banner button action (guarded)
const bannerButton = document.querySelector(".banner-text button");
if (bannerButton) {
  bannerButton.addEventListener("click", () => {
    alert("Browse Books clicked!");
  });
}

// attach click to menu button (in case HTML didn't use onclick)
const menuBtn = document.getElementById('menuBtn');
if (menuBtn) {
  menuBtn.addEventListener('click', (e) => {
    toggleMenu();
  });
}
