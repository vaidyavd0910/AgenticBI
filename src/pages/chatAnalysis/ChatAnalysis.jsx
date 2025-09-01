import React, { useState, useEffect } from 'react';
import { ReusableDropdown } from '../../components/dropDown/ReusableDropdown';
import styles from './ChatAnalysis.module.css';
import bmw from '../../assets/bmw-logo.svg';
import { ChatAnalysisCard } from '../../components/chatAnalysisCard/ChatAnalysisCard';
import { getChatHistory } from '../../service/Api';
// import { getChatHistory } from '../../service/Api/'; // import your API function

const DropDown = [
  { value: 'opt1', label: 'Most Recent' },
  { value: 'opt2', label: 'Oldest First' },
  { value: 'opt3', label: 'Name A-Z' },
  { value: 'opt4', label: 'Most Messages' },
];

export const ChatAnalysis = ({sendMessage, setDataset, setTimerange,setTitle}) => {
  const [selectedData, setSelectedData] = useState('opt1');
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDatasetChange = (value) => {
    setSelectedData(value);
    console.log('Selected dataset:', value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChatHistory();
        console.log("API Response:", data);
        setChatData(data);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.textHeader}>
          Chat Analyses
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
          <div className={styles.bmwLogo}>
            <img src={bmw} alt="BMW Logo" style={{ height: '22px'}} />
          </div>
        </div>
      </div>

      <div className={styles.analysisCardContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          chatData.map((card) => (
            <ChatAnalysisCard
              key={card.id}
              cardData={{
                title: card.session_name,
                old_query: card.user_query,
                description: card.response.summary,
                messages: card.response.table.rows.length, 
                time: new Date(card.timestamp).toLocaleString(),
                tags: card.response.Variables_Detected || [],
                datasetType: card.dataset || "Unknown Dataset",
                timeRange: card.timerange || "Not specified"
              }}
              sendMessage={sendMessage}
              setDataset={setDataset}
              setTimerange={setTimerange}
              setTitle={setTitle}
            />
          ))
        )}
      </div>
    </div>
  );
};
