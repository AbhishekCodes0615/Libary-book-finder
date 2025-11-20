// Toggle sidebar open/close
        (function(){
            const menuBtn = document.querySelector('.menu-btn');
            const sidebar = document.getElementById('sidebar');
            const overlay = document.getElementById('sidebarOverlay');
            const navLinks = document.querySelectorAll('.nav-list a');

            function setAria(expanded) {
                menuBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                overlay.setAttribute('aria-hidden', expanded ? 'false' : 'true');
            }

            // open/close handler
            function toggleSidebar() {
                const isOpen = sidebar.classList.toggle('open');
                setAria(isOpen);
            }

            menuBtn.addEventListener('click', function(e){
                e.stopPropagation();
                toggleSidebar();
            });

            // clicking overlay closes sidebar
            overlay.addEventListener('click', function(){
                sidebar.classList.remove('open');
                setAria(false);
            });

            // close sidebar when a nav link is clicked (useful on small screens)
            navLinks.forEach(link => {
                link.addEventListener('click', function(){
                    if (window.matchMedia('(max-width: 900px)').matches) {
                        sidebar.classList.remove('open');
                        setAria(false);
                    }
                });
            });

            // optional: close sidebar on ESC
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    sidebar.classList.remove('open');
                    setAria(false);
                }
            });

            // Ensure correct state on resize
            window.addEventListener('resize', () => {
                if (!window.matchMedia('(max-width: 900px)').matches) {
                    // on large screens ensure aria reflects visible sidebar
                    sidebar.classList.remove('open'); // we use transform only for small screens
                    setAria(false);
                }
            });
        })();