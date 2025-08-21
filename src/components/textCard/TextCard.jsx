import React from 'react'
import styles from './TextCard.module.css';
export const TextCard = ({ text, onClick }) => {
  return (
     <div className={styles.background}
     
      onClick={onClick}
    >
      {text}
    </div>
  )
}
