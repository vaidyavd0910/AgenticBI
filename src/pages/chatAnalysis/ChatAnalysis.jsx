import React, { useState, useEffect, useMemo } from 'react';
import { ReusableDropdown } from '../../components/dropDown/ReusableDropdown';
import styles from './ChatAnalysis.module.css';
import bmw from '../../assets/bmw-logo.svg';
import { ChatAnalysisCard } from '../../components/chatAnalysisCard/ChatAnalysisCard';
import { getChatHistory } from '../../service/Api';

const DropDown = [
  { value: 'opt1', label: 'Most Recent' },
  { value: 'opt2', label: 'Oldest First' },
  { value: 'opt3', label: 'Name A-Z' },
  { value: 'opt4', label: 'Most Messages' },
];

export const ChatAnalysis = ({ sendMessage, setDataset, setTimerange, setTitle }) => {
  const [selectedData, setSelectedData] = useState('opt1');
  const [chatData, setChatData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDatasetChange = (value) => {
    setSelectedData(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getChatHistory();
        setChatData(data);
      } catch (err) {
        console.error("Error fetching chat history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Sorting logic applied here
  const sortedChatData = useMemo(() => {
    let sorted = [...chatData];

    switch (selectedData) {
      case 'opt1': // Most Recent
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;

      case 'opt2': // Oldest First
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;

      case 'opt3': // Name A-Z
        sorted.sort((a, b) =>
          (a.session_name || '').localeCompare(b.session_name || '')
        );
        break;

      case 'opt4': // Most Messages
        sorted.sort(
          (a, b) =>
            (b.response?.table?.rows?.length || 0) -
            (a.response?.table?.rows?.length || 0)
        );
        break;

      default:
        break;
    }

    return sorted;
  }, [chatData, selectedData]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.header}>
        <div className={styles.textHeader}>Chat Analyses</div>
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
            <img src={bmw} alt="BMW Logo" style={{ height: '22px' }} />
          </div>
        </div>
      </div>

      <div className={styles.analysisCardContainer}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          sortedChatData.map((card) => (
            <ChatAnalysisCard
              key={card.id}
              cardData={{
                title: card.session_name,
                old_query: card.user_query,
                description: card.response.summary,
                messages: card.response?.table?.rows?.length || 0,
                time: new Date(card.timestamp).toLocaleString(),
                tags: card.response?.Variables_Detected || [],
                datasetType: card.dataset || 'Unknown Dataset',
                timeRange: card.timerange || 'Not specified',
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
