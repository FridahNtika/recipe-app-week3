import React from 'react';
import axios from 'axios';
import MessageSend from './MessageSend';
import Message from './Message';
import { useEffect, useState, useRef } from "react";

const ChatBot = () => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  
  const sendMessage = async (message) => {
    console.log("Prompt: ", message)
    
    // if (input.trim() === '') return;
    const userMessage = { role: 'user', content: message };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setLoading(true);
    console.log("Latest Conversation",conversation)
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

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    // <div className="main-content">
      // <div className="main-container">
        <div className="parent-container">
          <div className="chat-container" ref={chatContainerRef}>
            {/* <div className="conversation-container"> */}
              {conversation.map((message, index) => {
                return (
                  <>
                    <Message key={index} user={message.role} message={message.content} />
                  </>
                );
              })}
            {/* </div> */}
          </div>
          <div className="send-container">
            <MessageSend sendMessage={sendMessage} />
          </div>
        </div>
      // </div>
    // </div> 
  );
};

export default ChatBot;
