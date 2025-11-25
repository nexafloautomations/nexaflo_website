(function () {
    // Determine if we are on the home page
    const isHomePage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

    // Helper to get correct link path
    const getLink = (hash) => isHomePage ? hash : `index.html${hash}`;

    const headerHTML = `
    <header class="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur z-50 border-b border-gray-100 transition-shadow duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="${getLink('#hero')}" class="flex items-center">
                        <img src="logo.png" alt="Nexaflo Automations Logo" class="h-10 w-auto mr-3" />
                    </a>
                </div>

                <nav class="hidden md:flex items-center space-x-8">
                    <a href="${getLink('#hero')}" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Home</a>
                    <a href="${getLink('#about')}" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">About Us</a>
                    <a href="${getLink('#services')}" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Services</a>
                    <a href="${getLink('#contact')}" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Contact Us</a>
                    <a href="https://calendly.com/nexafloautomations/new-meeting" target="_blank" rel="noopener noreferrer" class="gradient-cyan-blue text-white px-6 py-2 rounded-full hover:shadow-lg btn-hover font-medium" style="background: linear-gradient(to right, #06b6d4, #2563eb);">
                        Get Started
                    </a>
                </nav>

                <div class="md:hidden flex items-center">
                    <button id="mobile-menu-btn" class="text-gray-700 hover:text-cyan-600 focus:outline-none">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                            <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
            <div class="px-4 pt-2 pb-6 space-y-2">
                <a href="${getLink('#hero')}" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Home</a>
                <a href="${getLink('#about')}" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">About Us</a>
                <a href="${getLink('#services')}" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Services</a>
                <a href="${getLink('#contact')}" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Contact Us</a>
                <div class="pt-4">
                    <a href="https://calendly.com/nexafloautomations/new-meeting" target="_blank" rel="noopener noreferrer" class="block w-full text-center gradient-cyan-blue text-white px-6 py-3 rounded-full hover:shadow-lg btn-hover font-medium" style="background: linear-gradient(to right, #06b6d4, #2563eb);">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    </header>
    <div style="height: 64px;"></div> <!-- Spacer for fixed header -->
    `;

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
})();
