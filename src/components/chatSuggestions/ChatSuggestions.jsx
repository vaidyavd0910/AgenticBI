import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ChatSuggestions.module.css';
import { Sparkles } from 'lucide-react';
import { TextCard } from '../textCard/TextCard';

const { Title, Text } = Typography;

const suggestions = [
  "Show me top performing products this month",
  "Compare revenue growth year over year",
  "What are the main drivers of customer churn?",
  "Analyze conversion rates by marketing channel",
  "Identify seasonal trends in sales data",
  "Show me regional performance breakdown"
];

const ChatSuggestions = ({ setInput, sendMessage }) => {
  const handleClick = (text) => {
    setInput(text);
    // sendMessage && sendMessage(text);
  };

  return (
    <div className={styles.chatSuggestionContainer}>
      <div className={styles.sparkel}>
        <Sparkles color={'#1890ff'}  height={'40'} width={'40'}/>
        </div>
      <Title level={4}>Start your analysis</Title>
      <Text type="secondary">Ask any question about your data in natural language</Text>
      <div className={styles.suggestionsGrid}>
        {suggestions.map((item, idx) => (
    <TextCard
      key={idx}
      text={item}
      onClick={() => handleClick(item)} 
    />
))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
