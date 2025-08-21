import React from 'react';
import { CustomInput } from '../customInput/CustomInput';
import styles from './Footer.module.css';

export const Footer = ({ message, setMessage, onSend }) => {
  return (
    <div className={styles.background}>
      <CustomInput
        placeholder="Ask anything about your data..."
        value={message}
        onChange={setMessage}
        onSend={onSend}
      />
    </div>
  );
};
