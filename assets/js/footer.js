(async function () {
    // Determine if we are in a subdirectory
    const isInSubdirectory = window.location.pathname.includes('/product_pages/') || window.location.pathname.includes('/legal_pages/');
    const rootPath = isInSubdirectory ? '../' : '/';

    try {
        const response = await fetch(rootPath + 'src/components/footer.html');
        if (!response.ok) throw new Error('Failed to load footer');
        const footerHTML = await response.text();

        // Inject before chatbot or at the end of body
        const chatbotContainer = document.getElementById('chatbot-container');
        if (chatbotContainer) {
            chatbotContainer.insertAdjacentHTML('beforebegin', footerHTML);
        } else {
            document.body.insertAdjacentHTML('beforeend', footerHTML);
        }

    } catch (error) {
        console.error('Error loading footer:', error);
    }
})();
