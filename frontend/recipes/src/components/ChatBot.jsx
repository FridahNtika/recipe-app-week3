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
    <div className="chatbot-container">
      <div className="chat-window">
        {conversation.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            {message.content}
          </div>
        ))}
        {loading && <div className="chat-message system">Typing...</div>}
      </div>
      <input 
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type your message..."
        className="chat-input"
      />
      <button onClick={sendMessage} className="send-button">Send</button>
    </div>
  );
};

export default ChatBot;
