import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { Footer } from '../footer/Footer';
import { useLocation } from 'react-router-dom';
import ChatSuggestions from '../chatSuggestions/ChatSuggestions';
import { ChatResponseCard } from '../chatResponseCard/ChatResponseCard';
import { chatMessageData } from '../../utils/staticData';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const ChatBot = ({ searchInput, setSearchInput, messages, sendMessage }) => {
  const location = useLocation();
  const fromNewAnalysis = location.state?.fromNewAnalysis;

  // 👇 Ref for auto-scrolling
  const messagesEndRef = useRef(null);

  // 👇 Scroll to bottom whenever messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      <div className={styles.chatSectionParent}>
        <div className={styles.scrollableContainer}>
          <div className={styles.chatContainer}>
            {fromNewAnalysis && messages.length === 0 ? (
              <ChatSuggestions
                setInput={setSearchInput}
                sendMessage={() => sendMessage(searchInput)}
              />
            ) : (
              <div className={styles.chatHistory}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${styles[msg.sender]}`}
                  >
                    {msg.sender === 'user' ? (
                      <>{msg.text}</>
                    ) : msg.sender === 'loader' ? (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          borderRadius: '10px',
                          padding: '5px 1rem',
                          background: 'white',
                          minWidth: '400px',
                        }}
                      >
                        <Spin
                          indicator={<LoadingOutlined spin />}
                          size="small"
                          style={{ margin: '0px 3px' }}
                        />
                        <span>Analyzing your data...</span>
                      </div>
                    ) : (
                      <ChatResponseCard
                        summary={msg?.summary}
                        insights={msg?.insights}
                        question={chatMessageData?.question}
                        chartData={msg?.graph}
                        tableData={msg?.table}
                      />
                    )}
                  </div>
                ))}

                {/* 👇 Always keep this div at the bottom */}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        <Footer
          message={searchInput}
          setMessage={setSearchInput}
          onSend={() => sendMessage(searchInput)}
        />
      </div>
    </>
  );
};

export default ChatBot;
