import React from 'react'
import styles from './ChatAnalysisCard.module.css';
import { Play, FileText, RotateCcw, MessageSquare, Clock4 } from 'lucide-react'; // icons for actions

export const ChatAnalysisCard = ({ cardData }) => {
  return (
    <div className={styles.card}>
      {/* Hover Action Buttons */}
      <div className={styles.actions}>
        <button className={styles.continueBtn}>
          <Play size={16} /> Continue
        </button>
        <button className={styles.actionBtn}>
          <FileText size={16} /> Summarize
        </button>
        <button className={styles.actionBtn}>
          <RotateCcw size={16} /> Re-run
        </button>
      </div>

      {/* Card Content */}
      <h3 className={styles.title}>{cardData.title}</h3>
       
      <div className={styles.meta}>
          <MessageSquare height={10} /><span>{cardData.messages} messages</span>
        <Clock4 height={10} /><span>{cardData.time}</span>
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
