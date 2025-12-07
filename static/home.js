// ===== BOOK DATA =====
const books = [
  { id: 'b1', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, category: 'Literature', isbn: 'A2', cover: '/static/pride.jpg', desc: 'Pride and Prejudice is a romantic novel by Jane Austen...' },
  { id: 'b2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, category: 'Literature', isbn: 'A2', cover: '/static/to kill.jpg', desc: 'To Kill a Mockingbird is a 1960 novel by Harper Lee...' },
  { id: 'b3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, category: 'Literature', isbn: 'A2', cover: '/static/The_Great_Gatsby_Cover_1925_Retouched.jpg', desc: 'The Great Gatsby is a 1925 tragedy novel by F. Scott Fitzgerald...' },
  { id: 'b4', title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, category: 'Literature', isbn: 'A2', cover: '/static/jane.jpg', desc: 'Jane Eyre, by Charlotte Brontë, is an 1847 novel...' },
  { id: 'b5', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles Leiserson, Ronald Rivest, Clifford Stein', category: 'Computer Science (CS)', isbn: 'D4', cover: '/static/Introduction to Algorithms.jpg', desc: 'Introduction to Algorithms by Cormen, Leiserson, Rivest, and Stein...' },
  { id: 'b6', title: 'Dune', author: 'Frank Herbert', year: 1965, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: '/static/dune.jpg', desc: 'Dune is a 1965 science fiction novel by Frank Herbert...' },
  { id: 'b7', title: 'Foundation', author: 'Isaac Asimov', year: 1951, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: '/static/foundation.jpg', desc: 'Foundation is a science fiction novel by Isaac Asimov...' },
  { id: 'b8', title: 'Ender’s Game', author: 'Orson Scott Card', year: 1985, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: '/static/Ender.jpg', desc: 'Ender’s Game by Orson Scott Card is a 1985 science fiction novel...' },
  { id: 'b9', title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', isbn: 'D4', cover: '/static/clear code.jpg', desc: 'Clean Code is one of the most influential books in software development...' },
  { id: 'b10', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', year: 2004, category: 'Computer Science', isbn: 'D4', cover: '/static/Arti.jpg', desc: 'Artificial Intelligence: A Modern Approach, 3e offers the most comprehensive...' },
  { id: 'b11', title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', year: 1999, category: 'Computer Science', isbn: 'D4', cover: '/static/the pragmatic.jpg', desc: 'The Pragmatic Programmer by Andrew Hunt and David Thomas...' },
  { id: 'b12', title: 'The Time Machine', author: 'H. G. Wells', year: 1895, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: '/static/time machine.jpg', desc: 'The Time Machine is a classic science-fiction novella...' },
  { id: 'b13', title: 'The Book Thief', author: 'Markus Zusak', year: 1939, category: 'Historical', isbn: 'B3', cover: '/static/book thief.jpg', desc: 'The Book Thief by Markus Zusak is an internationally best-selling novel...' },
  { id: 'b14', title: 'All the Light We Cannot See', author: 'Anthony Doerr', year: 2018, category: 'Historical', isbn: 'B3', cover: '/static/all the light.jpg', desc: 'From the highly acclaimed Anthony Doerr, this is a stunning novel...' },
  { id: 'b15', title: 'Wolf Hall', author: 'Hilary Mantel', year: 2009, category: 'Historical', isbn: 'B3', cover: '/static/Wolf_Hall_cover.jpg', desc: 'Wolf Hall is a fictionalised biography documenting Thomas Cromwell...' },
  { id: 'b16', title: 'The Diary of a Young Girl', author: 'Anne Frank', year: 1947, category: 'Historical', isbn: 'B3', cover: '/static/dairy of a young.jpg', desc: 'The Diary of a Young Girl is a non-fiction book by Anne Frank...' }
];

// ===== DYNAMIC BOOK RENDERING =====
const bookListContainer = document.querySelector(".book-list");
function renderBooks(filteredBooks = books) {
  if (!bookListContainer) return;
  bookListContainer.innerHTML = "";

  filteredBooks.forEach(book => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");
    bookDiv.innerHTML = `
      <img src="${book.cover}" alt="${book.title}">
      <p>${book.title}</p>
    `;
    bookListContainer.appendChild(bookDiv);
  });
}

// Initial render
renderBooks();

// ===== SEARCH FUNCTIONALITY =====
const searchInput = document.querySelector(".search-box input");
if (searchInput) {
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(query));
    renderBooks(filteredBooks);
  });
}


// ===== SIDEBAR TOGGLE =====
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
    sb.focus?.();
  } else {
    sb.classList.add('hide');
    sb.setAttribute('aria-hidden', 'true');
    btn.setAttribute('aria-expanded', 'false');
    if (overlay) {
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden', 'true');
    }
    btn.focus?.();
  }
};

// Overlay click closes sidebar
(function initOverlayListener() {
  const overlay = document.getElementById('sidebarOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', () => {
    const sb = document.getElementById('sidebar');
    const btn = document.getElementById('menuBtn');
    if (sb && !sb.classList.contains('hide')) sb.classList.add('hide');
    if (btn) btn.setAttribute('aria-expanded', 'false');
    overlay.classList.remove('show');
    overlay.setAttribute('aria-hidden', 'true');
    btn?.focus?.();
  });
})();

// Escape key closes sidebar
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

// Window resize ensures sidebar state
window.addEventListener('resize', () => {
  const sb = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const btn = document.getElementById('menuBtn');

  if (!sb) return;

  if (window.innerWidth > 992) {
    sb.classList.remove('hide');
    sb.setAttribute('aria-hidden', 'false');
    if (overlay) overlay.classList.remove('show');
    if (btn) btn.setAttribute('aria-expanded', 'false');
  } else {
    if (!sb.classList.contains('hide')) {
      // leave as-is if user opened it
    } else {
      sb.classList.add('hide');
      sb.setAttribute('aria-hidden', 'true');
    }
  }
});

// Menu highlight
const setupMenuHighlight = () => {
  const menuItems = document.querySelectorAll(".sidebar ul li");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      menuItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
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

// Banner button
const bannerButton = document.querySelector(".banner-text button");
if (bannerButton) {
  bannerButton.addEventListener("click", () => {
    alert("Browse Books clicked!");
  });
}

// Attach click to menu button
const menuBtn = document.getElementById('menuBtn');
if (menuBtn) menuBtn.addEventListener('click', toggleMenu);
