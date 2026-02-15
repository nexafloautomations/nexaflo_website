(function () {
    // Inject Chatbot HTML
    const chatbotHTML = `
    <div id="chatbot-container" class="fixed bottom-6 right-6 flex flex-col items-end" style="font-family: 'Inter', sans-serif; z-index: 9999;">
        <!-- Chat Window -->
        <div id="chat-window" class="hidden bg-white rounded-2xl shadow-2xl w-80 sm:w-96 mb-4 overflow-hidden border border-gray-100 transition-all duration-300 transform origin-bottom-right scale-95 opacity-0">
            <!-- Header -->
            <div class="gradient-cyan-blue p-4 flex justify-between items-center" style="background: linear-gradient(to right, #06b6d4, #2563eb);">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                        <i class="fas fa-robot text-white text-sm"></i>
                    </div>
                    <div>
                        <h3 class="text-white font-bold text-sm">Nexa</h3>
                        <p class="text-cyan-100 text-xs flex items-center">
                            <span class="w-2 h-2 bg-green-400 rounded-full mr-1"></span> Online
                        </p>
                    </div>
                </div>
                <button id="close-chat" type="button" class="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-1 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            
            <!-- Messages Area -->
            <div id="chat-messages" class="h-80 overflow-y-auto p-4 bg-gray-50 space-y-4">
                <!-- Welcome Message -->
                <div class="flex justify-start">
                    <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%]">
                        <p class="text-gray-700 text-sm">Hello! 👋 I'm Nexa. How can I help you automate your work today?</p>
                    </div>
                </div>
            </div>
            
            <!-- Input Area -->
            <div class="p-4 bg-white border-t border-gray-100">
                <form id="chat-form" class="flex items-center space-x-2">
                    <input type="text" id="chat-input" placeholder="Type your message..." class="flex-1 bg-gray-100 border-0 rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-cyan-500 focus:bg-white transition-all outline-none" autocomplete="off">
                    <button type="submit" class="gradient-cyan-blue text-white p-2 rounded-full hover:shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed" style="background: linear-gradient(to right, #06b6d4, #2563eb);">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
                <div class="text-center mt-2">
                    <p class="text-[10px] text-gray-400">Powered by Nexaflo Automations</p>
                </div>
            </div>
        </div>

        <!-- WhatsApp Button -->
        <a href="https://wa.me/message/A4XUNKK73VJWK1" target="_blank" class="mb-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 bg-green-500 hover:bg-green-600 text-white" aria-label="Chat on WhatsApp">
            <i class="fab fa-whatsapp text-3xl"></i>
        </a>

        <!-- Toggle Button -->
        <button id="chat-toggle" type="button" class="gradient-cyan-blue text-white w-14 h-14 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110" style="background: linear-gradient(to right, #06b6d4, #2563eb);">
            <i id="chat-icon" class="fas fa-comment-alt text-xl"></i>
        </button>
    </div>
    `;

    // Ensure body exists before injecting
    if (document.body) {
        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    } else {
        console.error('Chatbot: document.body not found');
        return;
    }

    // Chatbot Logic
    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const chatIcon = document.getElementById('chat-icon');

    if (!chatToggle || !chatWindow || !closeChat || !chatForm || !chatInput || !chatMessages || !chatIcon) {
        console.error('Chatbot: One or more elements not found');
        return;
    }

    // Generate Random Session ID
    const sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
    console.log('Chat Session ID:', sessionId);

    // Toggle Chat Window
    function toggleChat() {
        const isHidden = chatWindow.classList.contains('hidden');

        if (isHidden) {
            // Open chat
            chatWindow.classList.remove('hidden');
            // Small delay to allow display:block to apply before opacity transition
            setTimeout(() => {
                chatWindow.classList.remove('opacity-0', 'scale-95');
            }, 10);

            chatIcon.classList.remove('fa-comment-alt');
            chatIcon.classList.add('fa-times');

            setTimeout(() => chatInput.focus(), 100);
        } else {
            // Close chat
            chatWindow.classList.add('opacity-0', 'scale-95');

            chatIcon.classList.remove('fa-times');
            chatIcon.classList.add('fa-comment-alt');

            // Wait for transition to finish before hiding
            setTimeout(() => {
                chatWindow.classList.add('hidden');
            }, 300);
        }
    }

    chatToggle.addEventListener('click', toggleChat);
    closeChat.addEventListener('click', toggleChat);

    // Add Message to Chat
    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `flex ${isUser ? 'justify-end' : 'justify-start'}`;

        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = isUser
            ? 'gradient-cyan-blue text-white p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[80%] text-sm'
            : 'bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 max-w-[80%] text-sm text-gray-700';

        // Apply gradient style inline for dynamic elements if class not available globally or to be safe
        if (isUser) {
            bubbleDiv.style.background = 'linear-gradient(to right, #06b6d4, #2563eb)';
        }

        bubbleDiv.textContent = text;
        messageDiv.appendChild(bubbleDiv);
        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Add Loading Indicator
    function addLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.id = 'chat-loading';
        loadingDiv.className = 'flex justify-start';
        loadingDiv.innerHTML = `
            <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-gray-100">
                <div class="flex space-x-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                </div>
            </div>
        `;
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Remove Loading Indicator
    function removeLoading() {
        const loadingDiv = document.getElementById('chat-loading');
        if (loadingDiv) loadingDiv.remove();
    }

    // Handle Form Submit
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;

        // Clear input
        chatInput.value = '';

        // Add user message
        addMessage(message, true);

        // Show loading
        addLoading();

        try {
            // Send to Webhook
            const response = await fetch('https://nexafloautomations.app.n8n.cloud/webhook/nexaflowebsite-bot', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    sessionId: sessionId,
                    timestamp: new Date().toISOString()
                })
            });

            removeLoading();

            if (response.ok) {
                const text = await response.text();
                console.log('Raw Webhook Response:', text);

                let data;
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    // Response is not JSON, use text directly
                    data = text;
                }

                console.log('Parsed Data:', data);

                // Handle n8n array response
                if (Array.isArray(data) && data.length > 0) {
                    data = data[0];
                }

                let reply = "Thanks for your message! We'll get back to you shortly.";

                if (typeof data === 'object' && data !== null) {
                    if (data.output) reply = data.output;
                    else if (data.text) reply = data.text;
                    else if (data.message) reply = data.message;
                    else if (data.body && data.body.output) reply = data.body.output;
                    // Fallback: check if there's a single key holding the string
                    else if (Object.keys(data).length === 1 && typeof Object.values(data)[0] === 'string') {
                        reply = Object.values(data)[0];
                    }
                } else if (typeof data === 'string') {
                    reply = data;
                }

                addMessage(reply);
            } else {
                console.error('Server returned error:', response.status, response.statusText);
                addMessage("Sorry, I'm having trouble connecting right now. Please try again later.");
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            removeLoading();
            addMessage("Sorry, something went wrong. Please check your connection.");
        }
    });
})();
