import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { Footer } from '../footer/Footer';
import { useLocation } from 'react-router-dom';
import ChatSuggestions from '../chatSuggestions/ChatSuggestions';
import { ChatResponseCard } from '../chatResponseCard/ChatResponseCard';
import { chatMessageData } from '../../utils/staticData';
import { Spin, Table } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

// const response ={
//   "summary": "Demand is trending upward with regional variance and product-specific spikes.",
//   "insights": "*Key Insights\n\n- **Query Focus: Best selling car\n- **Revenue Trend: Stable growth with notable spikes in March.\n- **Regional Highlight: North America leads; APAC shows fastest growth.\n\nRecommendations*\n\n- Prioritize inventory for models with accelerating demand.\n- Expand marketing in high-growth regions (APAC).\n- Monitor price elasticity for premium segments.\n",
//   "table": {
//     "columns": [
//       {
//         "title": "Date",
//         "dataIndex": "date"
//       },
//       {
//         "title": "Region",
//         "dataIndex": "region"
//       },
//       {
//         "title": "Product",
//         "dataIndex": "product"
//       },
//       {
//         "title": "Revenue",
//         "dataIndex": "revenue"
//       },
//       {
//         "title": "Growth Rate",
//         "dataIndex": "growthRate"
//       }
//     ],
//     "rows": [
//       {
//         "date": "2025-01-10",
//         "region": "North America",
//         "product": "Series 3",
//         "revenue": 400000,
//         "growthRate": 0.12
//       },
//       {
//         "date": "2025-01-15",
//         "region": "Europe",
//         "product": "Series 5",
//         "revenue": 300000,
//         "growthRate": 0.08
//       },
//       {
//         "date": "2025-03-10",
//         "region": "Asia Pacific",
//         "product": "X5",
//         "revenue": 980000,
//         "growthRate": 0.21
//       },
//       {
//         "date": "2025-04-17",
//         "region": "North America",
//         "product": "i4",
//         "revenue": 390800,
//         "growthRate": 0.15
//       }
//     ]
//   },
//   "graph": [
//     {
//       "date": "10-01-2025",
//       "product1": 4000,
//       "product2": 2400
//     },
//     {
//       "date": "15-01-2025",
//       "product1": 3000,
//       "product2": 1398
//     },
//     {
//       "date": "10-03-2025",
//       "product1": 2000,
//       "product2": 9800
//     },
//     {
//       "date": "17-04-2025",
//       "product1": 2780,
//       "product2": 3908
//     }
//   ],
//   "context_memory": [
//     {
//       "Time Period": "Jan-Apr 2025",
//       "Dataset": "Sales",
//       "Region": "North America",
//       "Product Category": "All Categories"
//     }
//   ],
//   "Variables_Detected": [
//     "Revenue",
//     "Growth Rate",
//     "Region"
//   ]
// }
const ChatBot = ({searchInput, setSearchInput, messages, sendMessage}) => {

  const location = useLocation();
  const fromNewAnalysis = location.state?.fromNewAnalysis;

  return (
    <>
      <div className={styles.chatSectionParent}>
        <div className={styles.scrollableContainer}>
          <div className={styles.chatContainer}>
            {fromNewAnalysis && messages.length === 0 ? (
              <ChatSuggestions setInput={setSearchInput} sendMessage={() => sendMessage(searchInput)} />
            ) : (
              <div className={styles.chatHistory}>
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`${styles.message} ${styles[msg.sender]}`}
                  >
                    {msg.sender === "user" ? (
                      <>{msg.text}</>
                    )  : msg.sender == "loader" ? (
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", borderRadius: "10px", padding: '5px 1rem', background:"white", minWidth: "400px"  }}>
                        <Spin indicator={<LoadingOutlined spin />} size="small" style={{margin: "0px 3px"}} />
                        <span>Analyzing your data...</span>
                      </div>
                    )
                      : (
                      <ChatResponseCard
                        summary={msg?.summary}
                        insights={msg?.insights}
                        question={chatMessageData?.question}
                        chartData={msg?.graph}
                        tableData={msg?.table}
                      />
                    )}

                  
                      
                  </div>
                ))}
              </div>
            )}
            
          </div>
        </div>

        <Footer message={searchInput} setMessage={setSearchInput} onSend={() => sendMessage(searchInput)} />
      </div>
    </>
  );
};

export default ChatBot;
