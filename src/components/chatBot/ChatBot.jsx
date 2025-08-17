import React, { useState } from 'react';
import axios from 'axios';
import styles from './ChatBot.module.css';
import { Footer } from '../footer/Footer';
import { useLocation } from 'react-router-dom';
import ChatSuggestions from '../chatSuggestions/ChatSuggestions';
import { ChatResponseCard } from '../chatResponseCard/ChatResponseCard';
import { chatMessageData } from '../../utils/staticData';
import { fetchQueryResult } from '../../service/Api';
import { Table } from 'antd';

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
const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [expanded, setExpanded] = useState(false);

  const location = useLocation();
  const fromNewAnalysis = location.state?.fromNewAnalysis;

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetchQueryResult(input);
      const botResponse = {
        sender: 'bot',
        chart: response.data?.showChart || false,
        summary: response.summary,
        insights: response.insights,
        table: response.table,
        graph: response.graph,
        contextMemory: response.context_memory,
        variablesDetected: response.Variables_Detected
      };

      setMessages([...newMessages, botResponse]);
    } catch (err) {
      console.error("API Error:", err);
      setMessages([...newMessages, { sender: 'bot', text: 'Server error' }]);
    }
  };

  return (
    <>
      <div className={styles.chatSectionParent}>
        <div className={styles.chatContainer}>
          {fromNewAnalysis && messages.length === 0 ? (
            <ChatSuggestions setInput={setInput} sendMessage={sendMessage} />
          ) : (
            <div className={styles.chatHistory}>
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`${styles.message} ${styles[msg.sender]}`}
                >
                  {index % 2 === 0 ? (
                    <>{msg.text}</>
                  ) : (
                    <ChatResponseCard
                      summary={msg?.summary}
                      insights={msg?.insights}
                      question={chatMessageData?.question}
                      chartData={msg?.graph}
                      tableData={msg?.table}
                    />
                  )}

                   {msg.summary && (
                        <div className={styles.summary}>
                         {msg.summary}
                          <span
                            className={styles.readMoreToggle}
                            onClick={() => setExpanded(!expanded)}
                          >
                            {expanded ? '🔼' : '🔽'} Read More
                          </span>
                        </div>
                      )}

                        {/* Table */}
                      {msg.table && (
                        <div style={{ marginTop: '10px' }}>
                          <h4>Data Table</h4>
                          <Table
                            columns={msg.table.columns}
                            dataSource={msg.table.rows.map((r, i) => ({
                              key: i,
                              ...r
                            }))}
                            pagination={false}
                            size="small"
                          />
                        </div>
                      )}


                      {/* Insights */}
                      {expanded && msg.insights && (
                        <div className={styles.expandedContent}>
                          <pre style={{ whiteSpace: 'pre-wrap' }}>
                            {msg.insights}
                          </pre>
                        </div>
                      )}

                      {/* Context Memory */}
                      {msg.contextMemory && (
                        <div style={{ marginTop: '10px' }}>
                          <h4>Context Memory</h4>
                          {msg.contextMemory.map((item, idx) => (
                            <div key={idx}>
                              {Object.entries(item).map(([k, v]) => (
                                <div key={k}><strong>{k}:</strong> {v}</div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Variables Detected */}
                      {msg.variablesDetected && (
                        <div style={{ marginTop: '10px' }}>
                          <h4>Variables Detected</h4>
                          <ul>
                            {msg.variablesDetected.map((v, idx) => (
                              <li key={idx}>{v}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    
                </div>
              ))}
            </div>
          )}
          
        </div>

        <Footer message={input} setMessage={setInput} onSend={sendMessage} />
      </div>
    </>
  );
};

export default ChatBot;
