const socket = io(); // Connects to the server

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const message = input.value;
  if (message.trim() !== '') {
    appendMessage(`You: ${message}`, 'user');
    socket.emit('chat message', message); // Send to server
    input.value = '';
  }
});

socket.on('chat message', function (msg) {
  appendMessage(msg, 'other');
});

function appendMessage(message, type) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('message');
  if (type === 'user') msgDiv.classList.add('user');
  msgDiv.textContent = message;
  messages.appendChild(msgDiv);
  messages.scrollTop = messages.scrollHeight;
}
