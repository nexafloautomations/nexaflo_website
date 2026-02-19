(function () {
    const footerHTML = `
<!-- Footer Component -->
<style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
    
    .footer-component {
        font-family: 'Inter', sans-serif;
        position: relative;
        z-index: 10;
        background: linear-gradient(135deg, #1e1b4b 0%, #4c1d95 50%, #1e1b4b 100%);
        color: white;
        padding: 5rem 1rem 3rem 1rem;
    }

    .footer-container {
        max-width: 80rem;
        margin: 0 auto;
        padding: 0 1rem;
    }

    .footer-brand-section {
        max-width: 48rem;
        margin: 0 auto 5rem auto;
        text-align: center;
    }

    .footer-brand-text {
        font-size: 2.25rem;
        font-weight: 700;
        margin-bottom: 1.5rem;
        background: linear-gradient(to right, #22d3ee, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        display: inline-block;
        letter-spacing: -0.02em;
    }

    .footer-tagline {
        font-size: 1.125rem;
        opacity: 0.8;
        line-height: 1.6;
        margin-bottom: 2.5rem;
    }

    .footer-social-container {
        display: flex;
        justify-content: center;
        gap: 1.25rem;
    }

    .footer-social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        background: rgba(255, 255, 255, 0.08);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        border-radius: 0.75rem;
        border: 1px solid rgba(255, 255, 255, 0.15);
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration: none;
        color: white;
    }

    .footer-social-link:hover {
        background: rgba(255, 255, 255, 0.15);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-3px);
        color: #22d3ee;
    }

    .footer-social-link i {
        font-size: 1.25rem;
    }

    .footer-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 3.5rem 2rem;
        margin-bottom: 5rem;
        text-align: center;
    }

    @media (min-width: 640px) {
        .footer-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (min-width: 1024px) {
        .footer-grid {
            grid-template-columns: repeat(4, 1fr);
            text-align: left;
            gap: 2rem;
        }
    }

    .footer-column {
        display: flex;
        flex-direction: column;
    }

    @media (min-width: 1024px) {
        .footer-column {
            align-items: flex-start;
        }
    }

    .footer-heading {
        font-size: 0.875rem;
        font-weight: 700;
        margin-bottom: 1.75rem;
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: rgba(255, 255, 255, 0.95);
    }

    .footer-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .footer-list li {
        margin-bottom: 0.875rem;
    }

    .footer-link {
        color: rgba(255, 255, 255, 0.7);
        text-decoration: none;
        font-size: 0.9375rem;
        transition: all 0.2s ease;
        display: inline-block;
    }

    .footer-link:hover {
        color: #22d3ee;
        transform: translateX(4px);
    }

    .footer-cta {
        display: inline-block;
        background: linear-gradient(to right, #06b6d4, #8b5cf6);
        color: white;
        padding: 0.875rem 2.25rem;
        border-radius: 0.75rem;
        font-size: 0.9375rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(6, 182, 212, 0.2);
        margin-top: 0.25rem;
    }

    .footer-cta:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
    }

    .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        padding-top: 2.5rem;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
    }

    .footer-copyright {
        font-size: 0.875rem;
        color: rgba(255, 255, 255, 0.5);
    }
</style>

<footer class="footer-component">
    <div class="footer-container">
        <!-- Centered Brand Section -->
        <div class="footer-brand-section">
            <div class="footer-brand-text">
                Nexaflo Automations
            </div>
            <p class="footer-tagline">
                Turning daily frustrations into tangible impact.
            </p>

            <!-- Social Media Icons -->
            <div class="footer-social-container">
                <a href="https://www.linkedin.com/company/nexafloautomations/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" class="footer-social-link">
                    <i class="fab fa-linkedin"></i>
                </a>
                <a href="https://x.com/nexaflo" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" class="footer-social-link">
                    <i class="fab fa-x-twitter"></i>
                </a>
                <a href="https://www.instagram.com/nexaflo_automations" target="_blank" rel="noopener noreferrer" aria-label="Instagram" class="footer-social-link">
                    <i class="fab fa-instagram"></i>
                </a>
                <a href="https://www.facebook.com/profile.php?id=61580061917882" target="_blank" rel="noopener noreferrer" aria-label="Facebook" class="footer-social-link">
                    <i class="fab fa-facebook"></i>
                </a>
            </div>
        </div>

        <!-- Navigation Grid -->
        <div class="footer-grid">
            <!-- Quick Links -->
            <div class="footer-column">
                <h3 class="footer-heading">Quick Links</h3>
                <ul class="footer-list">
                    <li><a href="/#hero" class="footer-link">Home</a></li>
                    <li><a href="/about.html" class="footer-link">About Us</a></li>
                    <li><a href="/surveys.html" class="footer-link">Surveys</a></li>
                    <li><a href="/contact.html" class="footer-link">Contact Us</a></li>
                </ul>
            </div>

            <!-- Solutions -->
            <div class="footer-column">
                <h3 class="footer-heading">Solutions</h3>
                <ul class="footer-list">
                    <li><a href="/solutions.html" class="footer-link">View Solutions</a></li>
                </ul>
            </div>

            <!-- Legal -->
            <div class="footer-column">
                <h3 class="footer-heading">Legal</h3>
                <ul class="footer-list">
                    <li><a href="/legal_pages/privacy-policy.html" class="footer-link">Privacy Policy</a></li>
                    <li><a href="/legal_pages/terms-of-service.html" class="footer-link">Terms of Service</a></li>
                    <li><a href="/legal_pages/data-deletion.html" class="footer-link">Data Deletion</a></li>
                    <li><a href="/legal_pages/refund-policy.html" class="footer-link">Refund Policy</a></li>
                </ul>
            </div>

            <!-- Get in Touch -->
            <div class="footer-column">
                <h3 class="footer-heading">Get in Touch</h3>
                <p style="color: rgba(255, 255, 255, 0.65); font-size: 0.9375rem; margin-bottom: 1.5rem; line-height: 1.5;">
                    Ready to automate your future? Let's discuss your next project.
                </p>
                <a href="/contact.html" class="footer-cta">
                    Contact Us
                </a>
            </div>
        </div>

        <!-- Bottom Copyright -->
        <div class="footer-bottom">
            <p class="footer-copyright">© 2026 Nexaflo Automations. All Rights Reserved.</p>
        </div>
    </div>
</footer>
    `;

    // Modern Injection Logic
    function injectFooter() {
        if (document.querySelector('.footer-component')) return;
        document.body.insertAdjacentHTML('beforeend', footerHTML);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectFooter);
    } else {
        injectFooter();
    }
})();




