import React from 'react';
import axios from 'axios';
import MessageSend from './MessageSend';
import Message from './Message';
import { useEffect, useState, useRef } from "react";

const ChatBot = ({recipe}) => {
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);

  const recipeName = recipe.recipeName
  const recipeAuthor = recipe.author

  let ingredients = ''
  recipe.ingredients?.map((ingr) => ingredients += ingr)

  // const messageHeader = `You are an assistant for a recipe website. Use the following information to assist the user with cooking instructions and any questions they might have related to the recipe. 
  // Recipe name: ${recipeName}
  // Ingredients: ${ingredients}
  // Recipe author: ${recipeAuthor}
  // `

  const messageHeader = `You are an assistant for a recipe website. Use the following information to assist the user with cooking instructions and any questions they might have related to the recipe. 
  Recipe name: ${recipe.recipeName}. Figure out the ingredients and tell the user if they ask.
  `

  console.log("header: ", messageHeader)

  const sendMessage = async (message) => {
    
    // if (input.trim() === '') return;
    const userMessage = { role: 'user', content: message };
    const updatedConversation = [...conversation, userMessage];
    setConversation(updatedConversation);
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5001/openai/message', { conversation: updatedConversation });
      // const response = await axios.post('', { conversation: updatedConversation });
  
      const botMessage = { role: 'system', content: response.data.botMessage };
      setConversation([...updatedConversation, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
    console.log("Latest Conversation",conversation)

  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  useEffect(() => {
    setConversation([{ role: 'user', content: messageHeader }])
  },[])

  return (
        <div className="parent-container">
          <div className="chat-container" ref={chatContainerRef}>
          <Message user={"system"} message={`Hi there! I am your cooking assistant. Feel free to ask me any questions about preparing ${recipeName}`} />
              {conversation.slice(1, conversation.length).map((message, index) => {
                return (
                  <>
                    <Message key={index} user={message.role} message={message.content} />
                  </>
                );
              })}
          </div>
          <div className="send-container">
            <MessageSend sendMessage={sendMessage} placeholder={"Type a message..."}/>
          </div>
        </div>
  );
};

export default ChatBot;
