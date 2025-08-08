import React from 'react';
import { LuSend } from "react-icons/lu";
import { Input } from 'antd';
const { TextArea } = Input;
import styles from './CustomInput.module.css';

export const CustomInput = ({ placeholder, value, onChange, onSend }) => {
  return (
    <div className={styles.overAll}>
      <div className={styles.customInputWrapper}>
        <TextArea
          placeholder={placeholder}
          autoSize
          className={styles.inputBox}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
        />
        <button className={styles.sendBtnDiv} onClick={onSend}>
          <LuSend className={styles.sendBtn} />
        </button>
      </div>
    </div>
  );
};
