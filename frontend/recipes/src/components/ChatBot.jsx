import React, { useState } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [conversation, setConversation] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = { role: 'user', content: input };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setInput('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/openai/message', { conversation: updatedConversation });
      const botMessage = { role: 'system', content: response.data.botMessage };
      setConversation([...updatedConversation, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '30vw', height: '80vh', margin: '2vh' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
        {conversation.map((msg, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
              margin: '5px 0',
              marginBottom: '3vh'
            }}
          >
            <div
              style={{
                padding: '10px',
                borderRadius: '10px',
                backgroundColor: msg.role === 'user' ? '#D1E8E4' : '#F7D9C4',
                maxWidth: '60%',
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && <div style={{ display: 'flex', justifyContent: 'flex-start', margin: '5px 0' }}>
          <div style={{ padding: '10px', borderRadius: '10px', backgroundColor: '#F7D9C4', maxWidth: '60%' }}>
            Typing...
          </div>
        </div>}
      </div>
      <div style={{ display: 'flex', marginTop: '10px' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          style={{ flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button
          onClick={sendMessage}
          style={{
            marginLeft: '10px',
            padding: '10px 20px',
            borderRadius: '5px',
            border: 'none',
            backgroundColor: '#00B4D8',
            color: 'white',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
