import React, { useState } from 'react'
import { CustomInput } from '../customInput/CustomInput'
import styles from './Footer.module.css'
export const Footer = () => {
     const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log('Send:', message);
      setMessage('');
    }
  };
  return (
    <div className= {styles.background}>
        <CustomInput
        placeholder="Ask anything about your data..."
        value={message}
        onChange={setMessage}
        onSend={handleSend}
      />
    </div>
  )
}
