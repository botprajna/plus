const form = document.querySelector('#chat-form');
const messageInput = document.querySelector('#message');
const reply = document.querySelector('#reply');
const sendButton = document.querySelector('#send-button');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const message = messageInput.value.trim();
  if (!message) return;

  sendButton.disabled = true;
  sendButton.textContent = '发送中...';
  reply.textContent = 'AI 正在思考...';

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || '请求失败');
    }

    reply.textContent = data.reply || '没有收到回复。';
  } catch (error) {
    reply.textContent = `出错了：${error.message}`;
  } finally {
    sendButton.disabled = false;
    sendButton.textContent = '发送';
  }
});
