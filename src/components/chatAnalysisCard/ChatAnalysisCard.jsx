import React from 'react'
import styles from './ChatAnalysisCard.module.css';

export const ChatAnalysisCard = ({cardData}) => {
  return (
	<div className={styles.card}>
      <h3 className={styles.title}>{cardData.title}</h3>
      <div className={styles.meta}>
        <span>{cardData.messages} messages</span>
        <span>• {cardData.time}</span>
      </div>
      <p className={styles.description}>{cardData.description}</p>
      <div className={styles.tags}>
        {cardData.tags.map((tag, i) => (
          <span key={i} className={styles.tag}>
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
