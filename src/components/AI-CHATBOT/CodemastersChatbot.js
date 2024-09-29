// CodemastersChatbot.js
import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { toast } from 'react-toastify';

export const CodemastersChatbot = () => {
  const [messages, setMessages] = useState([]);
  const [showChatbox, setShowChatbox] = useState(false);
  const [thinking, setThinking] = useState(false);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  useEffect(() => {
    if (showChatbox) {
      setMessages([{ text: 'Hello! How can I assist you today?', type: 'incoming' }]);
    }
  }, [showChatbox]);

  const handleSend = async (userMessage) => {
    setMessages([...messages, { text: userMessage, type: 'outgoing' }]);
    setThinking(true);

    try {
      const result = await model.generateContent(userMessage);
      if (!result || !result.response) {
        throw new Error('Invalid response');
      }

      const responseText = await result.response.text();
      setMessages([...messages, { text: userMessage, type: 'outgoing' }, { text: responseText, type: 'incoming' }]);
    } catch (error) {
      console.error('Error generating content:', error);
      setMessages([...messages, { text: userMessage, type: 'outgoing' }, { text: 'Error: Unable to generate response.', type: 'incoming' }]);
    } finally {
      setThinking(false);
    }
  };

  const handleCloseChatbox = () => {
    setShowChatbox(false);
    setMessages([]);
  };

  const handleOpenChatbox = () => {
    setShowChatbox(true);
  };

  const Chatbox = ({ messages }) => {
    const chatboxRef = useRef(null);

    useEffect(() => {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }, [messages]);

    const createChatLi = (text, type) => {
      const codeBlockRegex = /```(\w+)?\n([\s\S]*?)\n```/;
      const match = text.match(codeBlockRegex);

      const icon = type === 'incoming' ? '🤖' : '👤'; // Replace with your icon classes or images

      const handleCopy = (codeContent) => {
        console.log('Copy button clicked'); // Check if click event is firing
        navigator.clipboard.writeText(codeContent)
          .then(() => {
            toast.success('Code copied to clipboard'); // Log success
          })
          .catch((error) => {
            toast.error('Failed to copy code:', error); // Log any errors
          });
      };

      if (match) {
        const [, language, codeContent] = match;
        return (
          <li className={`chat ${type}`} key={text}>
            <span className="chat-icon">{icon}</span>
            <pre>
              <code className={`language-${language}`}>{codeContent.trim()}</code>
              <button className="action_has has_saved" aria-label="save" type="button" onClick={() => handleCopy(codeContent.trim())}>
                <svg
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  fill="none"
                >
                  <path
                    d="m19,21H5c-1.1,0-2-.9-2-2V5c0-1.1.9-2,2-2h11l5,5v11c0,1.1-.9,2-2,2Z"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    data-path="box"
                  ></path>
                  <path
                    d="M7 3L7 8L15 8"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    data-path="line-top"
                  ></path>
                  <path
                    d="M17 20L17 13L7 13L7 20"
                    stroke-linejoin="round"
                    stroke-linecap="round"
                    data-path="line-bottom"
                  ></path>
                </svg>
              </button>
            </pre>
          </li>
        );
      }

      return (
        <li className={`chat ${type}`} key={text}>
          <span className="chat-icon">{icon}</span>
          <p dangerouslySetInnerHTML={{ __html: text.replace(/\n/g, '<br />') }} />
        </li>
      );
    };

    return (
      <ul className="chatbox" ref={chatboxRef}>
        {messages.map((message, index) => createChatLi(message.text, message.type))}
      </ul>
    );
  };

  const ChatInput = ({ onSend }) => {
    const [message, setMessage] = useState('');
    const textareaRef = useRef(null);

    const handleChange = (e) => {
      setMessage(e.target.value);
    };

    const handleInput = () => {
      const textarea = textareaRef.current;
      textarea.style.height = 'auto'; // Reset height
      textarea.style.height = textarea.scrollHeight + 'px'; // Set to scrollHeight
    };

    const handleKeyPress = (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent new line
        handleSend();
      }
    };

    const handleSend = () => {
      if (message.trim()) {
        onSend(message);
        setMessage('');
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto'; // Reset height after sending
        }
      }
    };

    return (
      <div className="chat-input">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onInput={handleInput}
          onKeyPress={handleKeyPress}
          placeholder="Enter a Message...."
          style={{ overflow: 'hidden', resize: 'none' }} // Disable manual resizing
        />
        <span id="send-btn" className="material-symbols-outlined" onClick={handleSend}>
          send
        </span>
      </div>
    );
  };

  const ChatbotToggler = ({ toggleChatbox }) => (
    <button className="chatbot-toggler" onClick={toggleChatbox}>
      <span className="material-symbols-outlined">mode_comment</span>
      <span className="material-symbols-outlined">close</span>
    </button>
  );

  return (
    <div className={`App ${showChatbox ? 'show-chatbox' : ''}`}>
      <ChatbotToggler toggleChatbox={() => (showChatbox ? handleCloseChatbox() : handleOpenChatbox())} />
      {showChatbox && (
        <div className="chatbot">
          <header className="header">
            <h2>Chatbot</h2>
            <span className="close-btn material-symbols-outlined" onClick={handleCloseChatbox}>close</span>
          </header>
          <Chatbox messages={messages} />
          <ChatInput onSend={handleSend} />
        </div>
      )}
    </div>
  );
};
