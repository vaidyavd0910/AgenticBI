import React, { useState } from 'react'
import styles from './LandingPage.module.css';
import bmw from '../../assets/bmw-logo.svg'
import { Calendar, ChartColumnIncreasing, Database, Lightbulb, Mic, Send, Sparkles, Text } from 'lucide-react';
import Title from 'antd/es/skeleton/Title';
import TextArea from 'antd/es/input/TextArea';
import { fetchQueryResult } from '../../service/Api';
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from 'antd';
const questionsData = {
  KPI: [
    "What were our top performing products this quarter?",
    "Show me revenue trends by region",
    "Which customers have the highest lifetime value?",
    "What is our customer acquisition cost trend?",
    "How is our monthly recurring revenue growing?",
    "What is our current customer churn rate?",
  ],
  Suggested: [
    "Analyze customer churn patterns",
    "Compare marketing campaign ROI",
    "Identify seasonal trends in sales data",
    "What factors drive customer satisfaction?",
    "Which product features are most popular?",
    "Show me conversion funnel analysis",
  ],
  Popular: [
    "Which regions are most profitable?",
    "How is our customer base growing?",
    "Show me expenses vs revenue trends",
    "What’s the average order value?",
    "Who are our most loyal customers?",
    "What products are declining in sales?",
  ],
};
const datasetMenu = (
 <Menu width={'200px'}>
     <span style={{ 
     margin: 0, 
     padding: '5px',
     fontSize: "11px",  
     fontWeight: 'bold', // smaller font size
     color: "gray"       // gray text
   }}>Dataset</span>
    <Menu.Item key="all">All Datasets</Menu.Item>
    <Menu.Item key="sales">Sales Dataset</Menu.Item>
    <Menu.Item key="customer">Customer Dataset</Menu.Item>
    <Menu.Item key="marketing">Marketing Dataset</Menu.Item>
    <Menu.Item key="financial">Financial Dataset</Menu.Item>
  </Menu>
);

const timeMenu = (
  <Menu width={'200px'}>
    <span style={{ 
    margin: 0, 
    padding: '5px',
    fontSize: "11px",  
    fontWeight: 'bold', // smaller font size
    color: "gray"       // gray text
  }}>Time Range</span>
    <Menu.Item key="all">All Time</Menu.Item>
    <Menu.Item key="sales">Last 7 days</Menu.Item>
    <Menu.Item key="customer">Last 30 days</Menu.Item>
    <Menu.Item key="marketing">Last 90 days</Menu.Item>
    <Menu.Item key="financial">Last year</Menu.Item>
  </Menu>
);
const quickFilters = [
  { label: "KPI", type: "kpi" , icon: <ChartColumnIncreasing height={15}/>},
  { label: "Suggested", type: "suggested", icon: <Lightbulb height={15}/> },
  { label: "Popular", type: "popular" },
];
export const LandingPage = ({sendMessage}) => {
     const [value, setValue] = useState('');
     const navigate = useNavigate();

      const [activeFilter, setActiveFilter] = useState("");
       const handleMsg = async() => {
    if (!value.trim()) {
      console.log("Message is empty");
      return;
    }

    // Call your sendMessage function
    sendMessage(value);
     setValue("");
     navigate("/chatPage");
await fetchQueryResult(value);
 
    // Clear after sending

   
  };
  return (
    <div>
         <div className={styles.chatSuggestionContainer}>
              <div className={styles.header}>
                      <div className={styles.bmwLogo}>
                                              <img src={bmw} alt="BMW Logo" style={{ height: '22px'}} />
                                              </div>
              </div>
              <div className={styles.analysisContainer}>
  <div className={styles.sparkle}>
    <Sparkles color={'#1890ff'} height={'40'} width={'40'} />
  </div>
  <h1 className={styles.title}>Start your analysis</h1>
  <h4 className={styles.subtitle}>
    Ask any question about your data in natural language
  </h4>
</div>
</div>
<div className={styles.upperMost}>
  <div className={styles.queContainerUpperContainer}>
  <div className={styles.queContainer}>
    <div className={styles.quesOuterContainer}>
      <TextArea
        value={value}
        className={styles.textAreaCust}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask me anything about your business data..."
        autoSize={{ minRows: 3, maxRows: 7 }}
      />
      <div className={styles.iconsBar}>
        <div className={styles.iconsBarLeft}>
         <div className={styles.icons}>
  <Dropdown overlay={datasetMenu} trigger={['click']} placement="topLeft">
    <Database height={15} style={{ cursor: "pointer" }} />
  </Dropdown>
</div>
                        <div className={styles.icons}>
                           <Dropdown overlay={timeMenu} trigger={['click']} placement="topLeft">
            <Calendar height={15} style={{ cursor: "pointer" }} />
        </Dropdown>
         </div>
        </div>
        <div className={styles.iconsBarRight}>
           <div className={styles.icons}>
          <Mic height={15} /></div>
          <button
  onClick={handleMsg}
  disabled={!value.trim()}   // ✅ disables when empty
  className={`${styles.sendBtn} ${!value.trim() ? styles.disabled : ""}`}
>
  <Send height={15} />
</button>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
   

       <div>
            <div className={styles.container}>
      {/* Heading */}
      <h5 className={styles.headingQuieck}>Quick access questions</h5>

      {/* Filter Buttons */}
     <div className={styles.filterWrapper}>
  {quickFilters.map((f) => (
    <button
      key={f.label}
      onClick={() => setActiveFilter(f.label)}
      className={`${styles.filterBtn} ${styles[f.type]} ${
        activeFilter === f.label ? styles.active : ""
      }`}
    >
      <div className={styles.filterNameConatiner}>
<span className={styles.filterIcon}>{f.icon}</span>
      <span className={styles.filterName}>{f.label}</span>
      </div>
      
    </button>
  ))}
</div>


      {/* Questions Grid */}
      <div className={styles.questionsGrid}>
        {questionsData[activeFilter]?.map((q, idx) => (
          <button key={idx} className={styles.questionCard}  onClick={() => setValue(q)}>
            {q}
          </button>
        ))}
      </div>
    </div>
       </div>
    </div>
  )
}


