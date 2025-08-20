import React, { useState } from 'react'
import { ReusableDropdown } from '../../components/dropDown/ReusableDropdown';
import styles from './ChatAnalysis.module.css';
import bmw from '../../assets/bmw-logo.svg'
import { chatAnalysisData } from '../../utils/staticData';
import { ChatAnalysisCard } from '../../components/chatAnalysisCard/ChatAnalysisCard';
const DropDown = [
  { value: 'opt1', label: 'Most Recent' },
  { value: 'opt2', label: 'Oldest First' },
  { value: 'opt3', label: 'Name A-Z' },
  { value: 'opt3', label: 'Most Messages' },
];
export const ChatAnalysis = () => {
    const [selectedData, setSelectedData] = useState('');
      const handleDatasetChange = (value) => {
    setSelectedData(value);
    console.log('Selected dataset:', value);
  };
  return (
    <div className={styles.mainContainer}>
    <div className={styles.header}>
        <div>
            <h3>Chat Analysis Page</h3>
        </div>
        <div className={styles.rightContainer}>
             <div>
                        <ReusableDropdown
                          label=""
                          options={DropDown}
                          value={selectedData}
                          onChange={handleDatasetChange}
                        />
                      </div>
                        <img src={bmw} alt="BMW Logo" style={{ height: '25px'}} />
        </div>
    </div>
    <div className={styles.analysisCardContainer}>
      {chatAnalysisData.map((card) => (
        <ChatAnalysisCard key={card.id} cardData={card} />
      ))}
    </div>
    </div>
  )
}
