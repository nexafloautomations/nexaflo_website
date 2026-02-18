(async function () {
    // Determine if we are in a subdirectory
    const isInSubdirectory = window.location.pathname.includes('/product_pages/') || window.location.pathname.includes('/legal_pages/');
    const rootPath = isInSubdirectory ? '../' : '/';

    // Helper to get correct link path (replace logic if necessary, but direct links in HTML are usually better handled by <base> or absolute paths)
    // For this refactor, we are using absolute paths in the HTML file (/contact.html), so we don't need complex link rewriting 
    // UNLESS the site is hosted in a subdirectory. Assuming root hosting based on "localhost".

    try {
        const response = await fetch(rootPath + 'src/components/header.html');
        if (!response.ok) throw new Error('Failed to load header');
        const headerHTML = await response.text();

        // Inject at start of body
        document.body.insertAdjacentHTML('afterbegin', headerHTML);

        // Header Logic
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                menuIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });
        }

        const mobileLinks = document.querySelectorAll('.mobile-link');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                menuIcon.classList.remove('hidden');
                closeIcon.classList.add('hidden');
            });
        });

        // Scroll Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (header) {
                if (window.scrollY > 10) {
                    header.classList.add('shadow-md');
                } else {
                    header.classList.remove('shadow-md');
                }
            }
        });

    } catch (error) {
        console.error('Error loading header:', error);
    }
})();
