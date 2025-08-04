import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css'
import { Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: input,
      });

      setMessages([...newMessages, { sender: 'bot', text: response.data.reply }]);
    } catch (err) {
      setMessages([...newMessages, { sender: 'bot', text: 'Server error' }]);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chatHistory}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[msg.sender]}`}
          >
            {msg.text}
               {/* <div className={styles.card}>
        <div className={styles.summary}>
          <span>
            Revenue increased 23% QoQ with Premium products leading growth at 35%
          </span>
          <span className={styles.readMoreToggle} onClick={() => setExpanded(!expanded)}>
            {expanded ? <UpOutlined /> : <DownOutlined />} Read More
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
          <Button>Add to Dashboard</Button>
          <Button>Export Result</Button>
          <Button>Customize</Button>
        </div>
      </div> */}
          </div>
        ))}
      </div>

      <div className={styles.inputSection}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatBot;
