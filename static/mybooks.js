// mybooks.js — show reserved books + responsive sidebar
(() => {
  // ✅ SAME BOOK DATA AS catalogue.js (so IDs match)
  const books = [
    { id: 'b1', title: 'Pride and Prejudice', author: 'Jane Austen', year: 1813, category: 'Literature', isbn: 'A2', cover: 'static/pride.jpg', desc: 'Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813, that follows the witty and spirited Elizabeth Bennet as she navigates issues of manners, upbringing, morality, and marriage in the landed gentry of early 19th-century England. The story centers on the volatile relationship between Elizabeth and the proud, wealthy Mr. Darcy, who must overcome their initial prejudices and pride to find love and happiness. The novel is also known for its satirical commentary on the social pressures faced by the five Bennet daughters, whose family estate is entailed and must be inherited by a male relative, making marriage a crucial goal. ' },
    { id: 'b2', title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960, category: 'Literature', isbn: 'A2', cover: 'static/to kill.jpg', desc: 'To Kill a Mockingbird is a 1960 novel by Harper Lee set in the fictional town of Maycomb, Alabama, during the Great Depression. Narrated by a young girl named Scout Finch,  the story follows her and her brother Jem as they are raised by their widowed father, lawyer Atticus Finch. The narrative focuses on two main events: Atticus defense of Tom Robinson, a Black man falsely accused of raping a white woman, and the children fascination with their reclusive neighbor, Boo Radley. The novel is a coming-of-age story that explores themes of racial injustice, prejudice, and moral courage through the innocent eyes of a child.' },
    { id: 'b3', title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925, category: 'Literature', isbn: 'A2', cover: 'static/The_Great_Gatsby_Cover_1925_Retouched.jpg', desc: 'he Great Gatsby is a 1925 tragedy novel by F. Scott Fitzgerald about the mysterious millionaire Jay Gatsby and his obsessive pursuit of his former lover, Daisy Buchanan, set against the backdrop of the Jazz Age on Long Island. Considered a masterpiece of American literature, the story explores themes of wealth, love, the American Dream, social upheaval, and excess. Narrated by Nick Carraway, the book critiques the era materialism and moral decay. ' },
    { id: 'b4', title: 'Jane Eyre', author: 'Charlotte Brontë', year: 1847, category: 'Literature', isbn: 'A2', cover: 'static/jane.jpg', desc: 'Jane Eyre, by Charlotte Brontë, is an 1847 novel about an orphaned girl'+'s'  +'life from childhood to adulthood. It is a gothic romance that follows the protagonist, Jane, as she endures a harsh upbringing and finds a position as a governess at Thornfield Hall, where she falls in love with her mysterious employer, Mr. Rochester. The story is known for its realistic portrayal of a woman'+'s' +'inner life, her search for equality, and the novel'+'s'+' blend of romance, mystery, and realism.' },
    { id: 'b5', title: 'Introduction to Algorithms', author: 'Thomas H. Cormen, Charles Leiserson, Ronald Rivest, Clifford Stein', category: 'Computer Science (CS)', isbn: 'D4', cover: 'static/Introduction to Algorithms.jpg', desc: 'ntroduction to Algorithms by Cormen, Leiserson, Rivest, and Stein is a comprehensive and widely-used textbook on computer algorithms, often nicknamed "CLRS". It covers a vast range of algorithms and data structures, providing both a rigorous academic resource and a practical reference for professionals. The book presents algorithms in a clear, English-based pseudocode and includes mathematical rigor alongside explanations of engineering and design issues. ' },
    { id: 'b6', title: 'Dune', author: 'Frank Herbert', year: 1965, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: 'static/dune.jpg', desc: 'Dune is a 1965 science fiction novel by Frank Herbert set in a distant future, feudal intergalactic empire, and it follows the young Paul Atreides as his family is tasked with ruling the desert planet Arrakis. Arrakis is the sole source of "melange," or "spice," a drug vital for interstellar travel that can extend life and enhance consciousness. The story explores a complex web of politics, religion, ecology, and human evolution as Paul must navigate betrayal and a destiny greater than he imagined.' },
    { id: 'b7', title: 'Foundation', author: 'Isaac Asimov', year: 1951, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: 'static/foundation.jpg', desc: 'Foundation is a science fiction novel by Isaac Asimov, first published in 1951, about a crumbling Galactic Empire. The story follows psychohistorian Hari Seldon, who predicts a 30,000-year dark age and establishes a colony of experts on the desolate planet Terminus to shorten this interregnum to 1,000 years. The Foundation series, which this book launched, explores the centuries-long plan to preserve knowledge and rebuild civilization after the Empire' +'s' +'fall.' },
    { id: 'b8', title: 'Ender’s Game', author: 'Orson Scott Card', year: 1985, category: 'Sci-Fi (Science Fiction)', isbn: 'E7', cover: 'static/Ender.jpg', desc: 'Ender'+ 's'+'  Game by Orson Scott Card is a 1985 science fiction novel about a brilliant young boy named Andrew "Ender" Wiggin who is recruited by the military to attend a space-based Battle School. There, he undergoes rigorous training in war games to become a commander in humanity'+ 's'+' fight against a hostile alien race known as the "buggers". The book explores themes of leadership, morality, and the psychological toll of war as Ender navigates isolation, rivalry, and immense pressure to save humankind.' },
    { id: 'b9', title: 'Clean Code', author: 'Robert C. Martin', category: 'Computer Science', isbn: 'D4', cover: 'static/clear code.jpg', desc: 'Clean Code is one of the most influential books in software development, written by Robert C. Martin, also known as Uncle Bob.It teaches programmers how to write clean, readable, maintainable, and scalable code—not just code that works, but code that is good.' },
    { id: 'b10', title: 'Artificial Intelligence: A Modern Approach', author: 'Stuart Russell & Peter Norvig', year: 2004, category: ' Computer Science', isbn: 'D4', cover: 'static/Arti.jpg', desc: 'Artificial Intelligence: A Modern Approach, 3e offers the most comprehensive, up-to-date introduction to the theory and practice of artificial intelligence. Number one in its field, this textbook is ideal for one or two-semester, undergraduate or graduate-level courses in Artificial Intelligence.' },
    { id: 'b11', title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', year: 1999, category: ' Computer Science', isbn: 'D4', cover: 'static/the pragmatic.jpg', desc: 'The Pragmatic Programmer by Andrew Hunt and David Thomas is a guide to improving software development skills, covering topics like personal responsibility, architectural techniques, and career development. The book uses anecdotes and analogies to illustrate best practices and common pitfalls, emphasizing continuous improvement, learning, and adaptability regardless of a programmer'+ 's experience level. It has become an influential and popular resource for developers seeking to become more productive and efficient.' },
    { id: 'b12', title: 'The Time Machine', author: 'H. G. Wells', year: 1895, category: '  Sci-Fi (Science Fiction)', isbn: 'E7', cover: 'static/time machine.jpg', desc: 'The Time Machine is a classic science-fiction novella written by H. G. Wells and first published in 1895. It is one of the earliest works to introduce the concept of a machine that can travel through time, making Wells known as the father of science fiction.' },
    { id: 'b13', title: ' The Book Thief', author: 'Markus Zusak', year: 1939, category: ' Historical', isbn: 'B3', cover: 'static/book thief.jpg', desc: 'He Book Thief by Markus Zusak is an internationally best-selling and critically acclaimed historical fiction novel, narrated by Death, that tells the story of a young girl' +'s'+' experiences in Nazi Germany during World War II.' },
    { id: 'b14', title: 'All the Light We Cannot See', author: 'Anthony Doerr', year: 2018, category: ' Historical', isbn: 'B3', cover: 'static/all the light.jpg', desc: 'from the highly acclaimed, multiple award-winning Anthony Doerr, the stunningly beautiful instant bestseller about a blind French girl and a German boy whose paths collide in occupied France as both try to survive the devastation of world War II.' },
    { id: 'b15', title: 'Wolf Hall', author: 'Hilary Mantel', year: 2009, category: 'Historical', isbn: 'B3', cover: 'static/Wolf_Hall_cover.jpg', desc: 'Set in the period from 1500 to 1535, Wolf Hall is a sympathetic fictionalised biography documenting the rapid rise to power of Thomas Cromwell in the court of Henry VIII through to the death of Sir Thomas More. The novel won both the Booker Prize and the National Book Critics Circle Award.' },
    { id: 'b16', title: 'The Diary of a Young Girl', author: 'Anne Frank', year: 1947, category: 'Historical', isbn: 'B3', cover: 'static/dairy of a young.jpg', desc: 'The Diary of a Young Girl is a non-fiction book by Anne Frank that chronicles her family'+'s two years in hiding from the Nazis during World War II in Amsterdam. Written in a diary format, it documents her experiences, fears, and hopes while living in a secret annex, and is a powerful testament to the human spirit amidst the horrors of the Holocaust. The diary provides a personal, philosophical, and often humorous account of a teenager'+'s life in confinement, detailing her relationships, and her evolving thoughts on the war and humanity.' },
  ];

  // 🔐 same localStorage key as catalogue.js
  const RESERVED_KEY = 'catalogue_reserved_ids';

  // DOM
  const grid = document.getElementById('myBooksGrid');
  const empty = document.getElementById('myBooksEmpty');
  const countEl = document.getElementById('reservedCount');
  const mySearch = document.getElementById('mySearch');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const menuBtn = document.getElementById('menuBtn');

  function getReservedIds(){
    try { return JSON.parse(localStorage.getItem(RESERVED_KEY) || '[]'); }
    catch(e){ return []; }
  }
  function setReservedIds(arr){
    localStorage.setItem(RESERVED_KEY, JSON.stringify(arr));
  }

  function escapeHtml(str=''){
    return String(str)
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'",'&#39;');
  }

  function render(filterText = ''){
    const reservedIds = getReservedIds();

    // Get book objects in the order reserved
    const reservedBooks = reservedIds
      .map(id => books.find(b => b.id === id))
      .filter(Boolean);

    const q = (filterText || '').trim().toLowerCase();
    const filtered = reservedBooks.filter(b => {
      if(!q) return true;
      return [b.title, b.author, b.isbn, b.category].join(' ').toLowerCase().includes(q);
    });

    if(countEl) countEl.textContent = `Reserved: ${reservedBooks.length}`;

    if(filtered.length === 0){
      grid.innerHTML = '';
      empty.innerHTML = `
        <div style="grid-column:1/-1;padding:20px;background:#fff;border-radius:12px;box-shadow:var(--shadow)">
          ${reservedBooks.length === 0 ? 'You have no reserved books yet.' : 'No reserved books match your search.'}
        </div>`;
      return;
    } else {
      empty.innerHTML = '';
    }

    grid.innerHTML = filtered.map(b => `
      <div class="card" data-id="${b.id}">
        <img src="${b.cover}" alt="${escapeHtml(b.title)} cover">
        <div class="info">
          <div class="title">${escapeHtml(b.title)}</div>
          <div class="meta">${escapeHtml(b.author)} • ${b.year || '—'} • ${escapeHtml(b.category)}</div>
          <div class="tags">
            <div class="tag">ISBN: ${escapeHtml(b.isbn)}</div>
            <div class="tag">Reserved</div>
          </div>
          <div class="row">
            <button class="btn ghost viewBtn">View</button>
            <button class="btn primary unreserveBtn">Un-reserve</button>
          </div>
        </div>
      </div>
    `).join('');

    attachCardListeners();
  }

  function attachCardListeners(){
    document.querySelectorAll('.card .unreserveBtn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('.card').dataset.id;
        unreserveBook(id);
      });
    });

    document.querySelectorAll('.card .viewBtn').forEach(btn => {
      btn.addEventListener('click', e => {
        const id = e.target.closest('.card').dataset.id;
        const b = books.find(x => x.id === id);
        if(!b) return;
        alert(`${b.title}\n\nAuthor: ${b.author}\nYear: ${b.year || '—'}\n\n${b.desc || ''}`);
      });
    });
  }

  function unreserveBook(id){
    const reserved = getReservedIds();
    const idx = reserved.indexOf(id);
    if(idx === -1) return;
    reserved.splice(idx,1);
    setReservedIds(reserved);
    render(mySearch.value);
  }

  // Clear all
  const clearAllBtn = document.getElementById('clearAll');
  clearAllBtn?.addEventListener('click', () => {
    if(!confirm('Un-reserve ALL books?')) return;
    setReservedIds([]);
    render(mySearch.value);
  });

  // Search input
  mySearch?.addEventListener('input', e => {
    render(e.target.value);
  });

  // ✅ Responsive sidebar toggle just for this page
  function openSidebar(){
    if(!sidebar) return;
    sidebar.classList.remove('hide');
    if(overlay){
      overlay.classList.add('show');
      overlay.setAttribute('aria-hidden','false');
    }
    if(menuBtn){
      menuBtn.setAttribute('aria-expanded','true');
    }
  }
  function closeSidebar(){
    if(!sidebar) return;
    sidebar.classList.add('hide');
    if(overlay){
      overlay.classList.remove('show');
      overlay.setAttribute('aria-hidden','true');
    }
    if(menuBtn){
      menuBtn.setAttribute('aria-expanded','false');
    }
  }
  function toggleSidebar(){
    if(!sidebar) return;
    if(sidebar.classList.contains('hide')) openSidebar(); else closeSidebar();
  }

  // expose for the onclick in HTML
  window.toggleMenu = toggleSidebar;

  menuBtn?.addEventListener('click', e => {
    e.preventDefault();
    toggleSidebar();
  });

  overlay?.addEventListener('click', () => closeSidebar());

  document.addEventListener('keydown', e => {
    if(e.key === 'Escape') closeSidebar();
  });

  // initial responsive state
  function setInitialSidebarState(){
    if(!sidebar) return;
    if(window.innerWidth > 992){
      sidebar.classList.remove('hide');
      overlay?.classList.remove('show');
    } else {
      sidebar.classList.add('hide');
    }
  }
  window.addEventListener('resize', setInitialSidebarState);
  setInitialSidebarState();

  // initial render of reserved books
  render();

  // expose for debugging
  window.__mybooks = { render, getReservedIds, books };
})();
