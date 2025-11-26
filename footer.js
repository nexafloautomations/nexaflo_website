(function () {
    const footerHTML = `
    <footer class="footer-gradient text-white py-12" style="background: linear-gradient(to right, #312e81, #7c3aed, #312e81);">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex flex-col md:flex-row justify-between items-center">
                <div class="text-left mb-4 md:mb-0">
                    <div class="text-2xl font-bold" style="background: linear-gradient(to right, #22d3ee, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">
                        Nexaflo Automations
                    </div>
                </div>

                <div class="social-icons flex gap-4 items-center justify-center py-5">
                    <a href="https://www.facebook.com/profile.php?id=61580061917882" target="_blank" aria-label="Facebook" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 hover:scale-115 transition-all duration-300">
                        <i class="fab fa-facebook text-2xl text-white"></i>
                    </a>
                    <a href="https://www.instagram.com/nexaflo_automations" target="_blank" aria-label="Instagram" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 hover:scale-115 transition-all duration-300">
                        <i class="fab fa-instagram text-2xl text-white"></i>
                    </a>
                    <a href="https://x.com/nexaflo" target="_blank" aria-label="X" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 hover:scale-115 transition-all duration-300">
                        <i class="fab fa-x-twitter text-2xl text-white"></i>
                    </a>
                    <a href="https://www.linkedin.com/company/nexafloautomations/" target="_blank" aria-label="LinkedIn" class="flex items-center justify-center w-12 h-12 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 hover:scale-115 transition-all duration-300">
                        <i class="fab fa-linkedin text-2xl text-white"></i>
                    </a>
                </div>

                <div class="text-right">
                    <p class="text-white opacity-80">
                        © 2025 Nexaflo Automations. All Rights Reserved.
                    </p>
                </div>
            </div>

            <div class="mt-8 pt-8 border-t border-white border-opacity-20 text-center">
                <p class="text-white opacity-60 text-sm">
                    Empowering businesses and individuals with intelligent automation solutions.
                </p>
                <div class="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">
                    <a href="privacy-policy.html" class="text-white opacity-60 hover:opacity-100 hover:text-cyan-300 transition-all">Privacy Policy</a>
                    <span class="text-white opacity-30 hidden sm:inline">|</span>
                    <a href="terms-of-service.html" class="text-white opacity-60 hover:opacity-100 hover:text-cyan-300 transition-all">Terms of Service</a>
                    <span class="text-white opacity-30 hidden sm:inline">|</span>
                    <a href="data-deletion.html" class="text-white opacity-60 hover:opacity-100 hover:text-cyan-300 transition-all">Data Deletion</a>
                    <span class="text-white opacity-30 hidden sm:inline">|</span>
                    <a href="refund-policy.html" class="text-white opacity-60 hover:opacity-100 hover:text-cyan-300 transition-all">Refund & Cancellation Policy</a>
                </div>
            </div>
        </div>
    </footer>
    `;

    // Inject before chatbot or at the end of body
    const chatbotContainer = document.getElementById('chatbot-container');
    if (chatbotContainer) {
        chatbotContainer.insertAdjacentHTML('beforebegin', footerHTML);
    } else {
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
})();
