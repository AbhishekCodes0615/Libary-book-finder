// mybooks.js — cleaned + responsive sidebar behavior

const RESERVED_KEY = "catalogue_reserved_ids";
let bookToRemove = null;

// Utility: safe parse
function safeParse(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (e) {
    return [];
  }
}

// Render reserved books grid from two possible localStorage sources:
// 1) If you store an array of book objects in "reservedBooks" or "mybooks"
// 2) Or, if you store only ids in "catalogue_reserved_ids" and you have a global `books` list, compatibility handled if present.
function getReservedBooks() {
  // prefer object list
  let arr = safeParse("reservedBooks");
  if (Array.isArray(arr) && arr.length) return arr;

  arr = safeParse("mybooks");
  if (Array.isArray(arr) && arr.length) return arr;

  // fallback: ids only
  const ids = safeParse(RESERVED_KEY);
  if (ids.length && window.books && Array.isArray(window.books)) {
    return window.books.filter(b => ids.includes(b.id));
  }
  return [];
}

function renderEmpty(container) {
  container.innerHTML = `
    <div class="empty-box fade-in">
      You have not reserved any books yet.
    </div>
  `;
}

function loadMyBooks() {
  const container = document.getElementById("myBooksGrid");
  const reserved = getReservedBooks();

  if (!reserved || reserved.length === 0) {
    renderEmpty(container);
    return;
  }

  container.innerHTML = reserved.map(b => {
    // support both object with fields and minimal placeholders
    const title = b.title || b.name || "Untitled";
    const author = b.author || "Unknown";
    const year = b.year || (b.published || "");
    const cover = b.cover || b.image || "https://via.placeholder.com/400x300?text=No+Cover";
    const isbn = b.isbn || b.id || "";
    const id = b.id || isbn || title;

    return `
      <div class="card fade-in" data-id="${id}">
        <img src="${cover}" alt="${title}">
        <div class="info">
          <div class="title">${title}</div>
          <div class="meta">${author} ${year ? "• " + year : ""}</div>
          <div class="tags">
            ${isbn ? `<div class="tag">ISBN: ${isbn}</div>` : ''}
            <div class="tag green">Reserved</div>
          </div>
          <div class="row">
            <button class="btn ghost" onclick="openReturnModal('${id}')">Return</button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// Modal functions
function openReturnModal(id) {
  bookToRemove = id;
  const modal = document.getElementById("returnModalBackdrop");
  modal.style.display = "flex";
  modal.setAttribute("aria-hidden", "false");
}
function closeReturnModal() {
  const modal = document.getElementById("returnModalBackdrop");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  bookToRemove = null;
}

// Confirm return handler
document.addEventListener("DOMContentLoaded", () => {
  const confirmBtn = document.getElementById("confirmReturn");
  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (!bookToRemove) return;
      // Try removing from several possible storages:
      // 1) remove object with matching id from reservedBooks or mybooks
      let changed = false;
      ["reservedBooks", "mybooks"].forEach(key => {
        let arr = safeParse(key);
        if (!Array.isArray(arr) || arr.length === 0) return;
        const before = arr.length;
        arr = arr.filter(b => {
          const bid = b.id || b.isbn || b.title || b.name;
          return String(bid) !== String(bookToRemove);
        });
        if (arr.length !== before) {
          localStorage.setItem(key, JSON.stringify(arr));
          changed = true;
        }
      });

      // 2) remove id from id-list storage
      let ids = safeParse(RESERVED_KEY);
      if (Array.isArray(ids) && ids.length) {
        const newIds = ids.filter(x => String(x) !== String(bookToRemove));
        if (newIds.length !== ids.length) {
          localStorage.setItem(RESERVED_KEY, JSON.stringify(newIds));
          changed = true;
        }
      }

      // If nothing matched, also try removing from "reservedBooks" by id field if stored as objects
      // Reload UI
      closeReturnModal();
      loadMyBooks();
    });
  }

  // initial render
  loadMyBooks();

  // also populate simple myBooksList if you used that earlier
  const list = document.getElementById("myBooksList");
  if (list) {
    const reserved = getReservedBooks();
    if (!reserved.length) {
      list.innerHTML = "<p style='color:var(--muted)'>No reserved books yet.</p>";
    } else {
      list.innerHTML = reserved.map(b => `<div style="padding:8px 0;border-bottom:1px solid rgba(0,0,0,0.04)"><strong>${b.title || b.name}</strong><div style="font-size:12px;color:var(--muted)">${b.author || ""} ${b.year? "• "+b.year:""}</div></div>`).join('');
    }
  }
});

// RESPONSIVE SIDEBAR LOGIC
const sidebar = document.getElementById("sidebar");
const mobileOverlay = document.getElementById("mobileOverlay");
const menuBtn = document.getElementById("menuBtn");

function isMobile() {
  return window.matchMedia && window.matchMedia("(max-width: 900px)").matches;
}

function openSidebar() {
  if (!sidebar) return;
  if (isMobile()) {
    sidebar.classList.add("open");
    mobileOverlay.classList.add("show");
    sidebar.classList.remove("collapsed");
    document.body.style.overflow = "hidden";
  } else {
    sidebar.classList.remove("collapsed");
    document.body.style.overflow = "";
  }
}

function closeSidebar() {
  if (!sidebar) return;
  if (isMobile()) {
    sidebar.classList.remove("open");
    mobileOverlay.classList.remove("show");
    document.body.style.overflow = "";
  } else {
    // collapse on desktop (toggle)
    sidebar.classList.add("collapsed");
  }
}

function toggleMenu() {
  if (!sidebar) return;
  if (isMobile()) {
    if (sidebar.classList.contains("open")) closeSidebar();
    else openSidebar();
  } else {
    // desktop: toggle collapsed class
    sidebar.classList.toggle("collapsed");
    // adjust main margin by toggling sibling (CSS handles layout)
  }
}

// expose to global for inline onclick in HTML
window.toggleMenu = toggleMenu;
window.openReturnModal = openReturnModal;
window.closeReturnModal = closeReturnModal;

// Close sidebar when overlay clicked (also handled in HTML via onclick)
if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeSidebar);
}

// Ensure sidebar state on resize
window.addEventListener("resize", () => {
  if (!sidebar) return;
  if (!isMobile()) {
    // reset mobile classes
    sidebar.classList.remove("open");
    mobileOverlay.classList.remove("show");
    document.body.style.overflow = "";
    // ensure not collapsed by default on large view (you can change)
    sidebar.classList.remove("collapsed");
  } else {
    // on mobile keep sidebar closed initially
    sidebar.classList.remove("collapsed");
  }
});
