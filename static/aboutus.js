// aboutus.js — responsive sidebar toggle + overlay behavior (matching My Books logic)

const sidebar = document.getElementById('sidebar');
const mobileOverlay = document.getElementById('mobileOverlay');
const menuBtn = document.getElementById('menuBtn');

function isMobile() {
  return window.matchMedia && window.matchMedia('(max-width: 900px)').matches;
}

function openSidebar() {
  if (!sidebar) return;
  if (isMobile()) {
    sidebar.classList.add('open');
    mobileOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  } else {
    sidebar.classList.remove('collapsed');
  }
}

function closeSidebar() {
  if (!sidebar) return;
  if (isMobile()) {
    sidebar.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
  } else {
    sidebar.classList.add('collapsed');
  }
}

function toggleMenu() {
  if (!sidebar) return;
  if (isMobile()) {
    if (sidebar.classList.contains('open')) closeSidebar();
    else openSidebar();
  } else {
    sidebar.classList.toggle('collapsed');
  }
}

// expose to global (used by inline onclick)
window.toggleMenu = toggleMenu;
window.closeSidebar = closeSidebar;

// close sidebar when clicking the overlay
if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeSidebar);
}

// close sidebar on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeSidebar();
});

// Keep sidebar state consistent on resize
window.addEventListener('resize', () => {
  if (!sidebar) return;
  if (!isMobile()) {
    sidebar.classList.remove('open');
    mobileOverlay.classList.remove('show');
    document.body.style.overflow = '';
    // leave collapsed state as-is (user toggle)
  } else {
    // on mobile start closed
    sidebar.classList.remove('collapsed');
  }
});
