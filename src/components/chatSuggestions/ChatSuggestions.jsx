import React from 'react';
import { Button, Typography } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './ChatSuggestions.module.css';

const { Title, Text } = Typography;

const suggestions = [
  "Show me top performing products this month",
  "Compare revenue growth year over year",
  "What are the main drivers of customer churn?",
  "Analyze conversion rates by marketing channel",
  "Identify seasonal trends in sales data",
  "Show me regional performance breakdown"
];

const ChatSuggestions = () => {
  return (
    <div className={styles.chatSuggestionContainer}>
      <PlusOutlined className={styles.icon} />
      <Title level={4}>Start your analysis</Title>
      <Text type="secondary">Ask any question about your data in natural language</Text>
      <div className={styles.suggestionsGrid}>
        {suggestions.map((item, idx) => (
          <Button key={idx} className={styles.suggestionBtn} type="default">
            {item}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ChatSuggestions;
