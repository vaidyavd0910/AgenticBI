import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { Footer } from '../footer/Footer';
import { useLocation } from 'react-router-dom';
import ChatSuggestions from '../chatSuggestions/ChatSuggestions';
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();
  const fromNewAnalysis = location.state?.fromNewAnalysis;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      const botResponse = {
        sender: 'bot',
        text: response.data.reply,
        chart: response.data.showChart,
      };

      setMessages([...newMessages, botResponse]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Server error' }]);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {fromNewAnalysis && messages.length === 0 ? (
        <ChatSuggestions setInput={setInput} sendMessage={sendMessage} />
      ) : (
        <>
          <div className={styles.chatHistory}>
            {messages.map((msg, index) => (
              <div key={index} className={`${styles.message} ${styles[msg.sender]}`}>
                {msg.text}

                {msg.sender === 'bot' && msg.chart && (
                  <div className={styles.card}>
                    <div className={styles.summary}>
                      <span>
                        Revenue increased 23% QoQ with Premium products leading growth at 35%
                      </span>
                      <span
                        className={styles.readMoreToggle}
                        onClick={() => setExpanded(!expanded)}
                      >
                        {expanded ? '🔼' : '🔽'} Read More
                      </span>
                    </div>

                    {expanded && (
                      <div className={styles.expandedContent}>
                        <p>
                          Detailed analysis would go here... market performance, regional breakdown,
                          customer segments, etc.
                        </p>
                      </div>
                    )}

                    <div className={styles.chartBox}>
                      📊 Interactive chart visualization would appear here
                    </div>

                    <div className={styles.actions}>
                      <button>Add to Dashboard</button>
                      <button>Export Result</button>
                      <button>Customize</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      <Footer message={input} setMessage={setInput} onSend={sendMessage} />
    </div>
  );
};

export default ChatBot;
