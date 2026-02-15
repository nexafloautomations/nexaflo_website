(function () {
    // Determine if we are in a subdirectory
    const isInSubdirectory = window.location.pathname.includes('/product_pages/') || window.location.pathname.includes('/legal_pages/');
    const rootPath = isInSubdirectory ? '../' : '';

    // Helper to get correct link path
    const getLink = (hash) => {
        // If it's an anchor link and we are on the home page (and not in a subdir), return just the hash
        const isHomePage = (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/')) && !isInSubdirectory;
        return isHomePage ? hash : `${rootPath}index.html${hash}`;
    };

    // Inject CSS for Header/Footer consistency
    const style = document.createElement('style');
    style.textContent = `
        /* Header & Footer Styles */
        .backdrop-blur {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
        }
        
        /* Gradients */
        .gradient-text {
            background: linear-gradient(to right, #06b6d4, #8b5cf6);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .footer-gradient {
            background: linear-gradient(135deg, #1e1b4b 0%, #5b21b6 50%, #1e1b4b 100%);
        }

        /* Mobile Menu Animation */
        #mobile-menu {
            transition: all 0.3s ease-in-out;
        }

        /* Scroll Effect Shadow */
        header.shadow-md {
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
    `;
    document.head.appendChild(style);

    const headerHTML = `
    <header class="fixed top-0 w-full bg-white bg-opacity-90 backdrop-blur z-50 border-b border-gray-100 transition-shadow duration-300">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-16">
                <div class="flex items-center">
                    <a href="${getLink('#hero')}" class="flex items-center">
                        <img src="${rootPath}assets/img/logo.png" alt="Nexaflo Automations Logo" class="h-10 w-auto mr-3" />
                    </a>
                </div>

                <nav class="hidden md:flex items-center space-x-8">
                    <a href="${getLink('#hero')}" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Home</a>
                    <a href="${rootPath}about.html" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">About Us</a>
                    
                    <!-- Solutions Dropdown -->
                    <div class="relative group">
                        <a href="${rootPath}solutions.html" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium flex items-center">
                            Solutions
                        </a>
                        <!-- Dropdown Menu -->
                        <div class="absolute left-1/2 transform -translate-x-1/2 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">
                            <div class="py-2">
                                <a href="${rootPath}solutions.html?industry=semiconductor" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-cyan-600 transition-colors">
                                    <div class="font-bold">Semiconductor</div>
                                    <div class="text-xs text-gray-500 mt-0.5">AutoQuote & ChipMatch</div>
                                </a>
                                <a href="${rootPath}solutions.html?industry=marketing" class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-purple-600 transition-colors">
                                    <div class="font-bold">Marketing Agencies</div>
                                    <div class="text-xs text-gray-500 mt-0.5">StrategyScout</div>
                                </a>
                            </div>
                        </div>
                    </div>

                    <a href="${rootPath}surveys.html" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Surveys</a>

                    <a href="${rootPath}contact.html" class="text-gray-700 hover:text-cyan-600 transition-colors font-medium">Contact Us</a>
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
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg max-h-[80vh] overflow-y-auto">
            <div class="px-4 pt-2 pb-6 space-y-2">
                <a href="${getLink('#hero')}" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Home</a>
                <a href="${rootPath}about.html" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">About Us</a>
                
                <!-- Mobile Solutions Submenu -->
                <div class="space-y-1">
                    <div class="px-3 py-2 text-base font-medium text-gray-900">Solutions</div>
                    
                    <div class="pl-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-2 mb-1">Industries</div>
                    <a href="${rootPath}solutions.html?industry=semiconductor" class="mobile-link block pl-6 pr-3 py-2 text-sm font-medium text-gray-600 hover:text-cyan-600 hover:bg-gray-50 rounded-md">
                        Semiconductor
                    </a>
                    <a href="${rootPath}solutions.html?industry=marketing" class="mobile-link block pl-6 pr-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                        Marketing Agencies
                    </a>

                    <div class="pl-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mt-3 mb-1">Products</div>
                    <a href="${rootPath}product_pages/autoquote.html" class="mobile-link block pl-6 pr-3 py-2 text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-50 rounded-md">
                        AutoQuote
                    </a>
                    <a href="${rootPath}product_pages/chipmatch.html" class="mobile-link block pl-6 pr-3 py-2 text-sm font-medium text-gray-600 hover:text-indigo-600 hover:bg-gray-50 rounded-md">
                        ChipMatch AI
                    </a>
                    <a href="${rootPath}product_pages/strategyscout.html" class="mobile-link block pl-6 pr-3 py-2 text-sm font-medium text-gray-600 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                        StrategyScout
                    </a>
                </div>

                <a href="${rootPath}surveys.html" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Surveys</a>
                <a href="${rootPath}contact.html" class="mobile-link block px-3 py-2 text-base font-medium text-gray-700 hover:text-cyan-600 hover:bg-gray-50 rounded-md">Contact Us</a>
            </div>
        </div>
    </header>

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
