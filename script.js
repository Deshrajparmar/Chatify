// JavaScript for Chatbot Functionality with Gemini AI Integration

// Elements
const chatPopup = document.querySelector('.chat-popup');
const chatBody = document.querySelector('.chat-body');
const chatForm = document.querySelector('.chat-form');
const messageInput = document.querySelector('.message-input');
const sendButton = document.querySelector('#send-message');

// Event listener for form submission
chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userMessage = messageInput.value.trim();

  if (userMessage) {
    appendMessage(userMessage, 'user');
    messageInput.value = '';

    // Simulate bot response (replace this with Gemini AI integration)
    appendMessage('...', 'bot', true);
    const botResponse = await getBotResponse(userMessage);
    removeThinkingIndicator();
    appendMessage(botResponse, 'bot');
  }
});

// Append a message to the chat body
function appendMessage(text, sender, isThinking = false) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', `${sender}-message`);

  if (isThinking) {
    const thinkingIndicator = document.createElement('div');
    thinkingIndicator.classList.add('thinking-indicator');
    thinkingIndicator.innerHTML = '<div class="dot"></div><div class="dot"></div><div class="dot"></div>';
    messageElement.appendChild(thinkingIndicator);
  } else {
    const messageText = document.createElement('div');
    messageText.classList.add('message-text');
    messageText.textContent = text;
    messageElement.appendChild(messageText);
  }

  chatBody.appendChild(messageElement);
  chatBody.scrollTop = chatBody.scrollHeight;
}

// Remove the thinking indicator
function removeThinkingIndicator() {
  const thinkingMessage = document.querySelector('.thinking-indicator');
  if (thinkingMessage) {
    thinkingMessage.parentElement.remove();
  }
}


async function getBotResponse(userMessage) {
    try {
      const response = await fetch('', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer YOUR_API_KEY',
        },
        body: JSON.stringify({ message: userMessage }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response from Gemini AI:', errorData);
        throw new Error(errorData.message || 'Unknown error');
      }
  
      const data = await response.json();
      return data.reply || 'Sorry, I couldn\'t understand that.';
    } catch (error) {
      console.error('Error fetching bot response:', error);
      return 'Oops! Something went wrong. Please try again later.';
    }
  }
  

// Event listener for send button
sendButton.addEventListener('click', () => {
  chatForm.dispatchEvent(new Event('submit'));
});
