import { useState } from 'react';

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([...messages, `You: ${input}`]);
    // For demo: echo the input as a bot response
    setMessages(msgs => [...msgs, `Bot: You said "${input}"`]);
    setInput('');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Simple Chatbot</h2>
      <div style={{ minHeight: 100, border: '1px solid #ccc', marginBottom: 10, padding: 10 }}>
        {messages.map((msg, i) => <div key={i}>{msg}</div>)}
      </div>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        style={{ width: '70%' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

export default App;
