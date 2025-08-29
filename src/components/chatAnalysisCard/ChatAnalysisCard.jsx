import React from 'react'
import styles from './ChatAnalysisCard.module.css';
import { Play, FileText, RotateCcw, MessageSquare, Clock4, Database, Tag } from 'lucide-react'; // icons for actions
import { useNavigate } from 'react-router-dom';

export const ChatAnalysisCard = ({ cardData, sendMessage, setDataset, setTimerange }) => {
   const navigate = useNavigate();
  
  const handleCardClick = async(cardData) => {
    setDataset(cardData?.datasetType);
    setTimerange(cardData?.timeRange);
    await sendMessage(cardData?.old_query, cardData?.datasetType, cardData?.timeRange, cardData?.title,  true);

    // Navigate to chat page with the session id
    // navigate(`/chat/${cardData.id}`, { state: { cardData } });
    navigate('/chatPage')
  };

  return (
    <div className={styles.card} onClick={() => handleCardClick(cardData)}>
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
      {/* <div className={styles.tags}> */}
        {cardData.tags?.length > 0 && (
          <div className={styles.tags}>
            {cardData.tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      {/* </div> */}
      <div className={styles.lableContainer}>
         <div className={styles.datasetTypeContainer}>
        <div className={styles.iconDiv}><Database height={15} /></div><div className={styles.datasetTypeCon}>{cardData.datasetType}</div>
      </div>
      <div className={styles.daysContainer}>
        <div className={styles.iconDiv}><Tag height={15} /></div><div className={styles.datasetTypeCon}>{cardData.timeRange}</div>
      </div>

      </div>
     
    </div>
  )
}
