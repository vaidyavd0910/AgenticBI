import React, { useState } from 'react'
import styles from './LandingPage.module.css';
import bmw from '../../assets/bmw-logo.svg'
import { Calendar, Database, Mic, Send, Sparkles, Text } from 'lucide-react';
import Title from 'antd/es/skeleton/Title';
import TextArea from 'antd/es/input/TextArea';
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
const quickFilters = [
  { label: "KPI", type: "kpi" },
  { label: "Suggested", type: "suggested" },
  { label: "Popular", type: "popular" },
];
export const LandingPage = ({sendMessage}) => {
     const [value, setValue] = useState('');
      const [activeFilter, setActiveFilter] = useState("KPI");
  return (
    <div>
         <div className={styles.chatSuggestionContainer}>
              <div className={styles.header}>
                    <img src={bmw} alt="BMW Logo" style={{ height: '25px'}} />
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
       <div className={styles.queContainerUpperContainer}>
             <div className={styles.queContainer}>
                <div className={styles.quesOuterContainer}>
                        <TextArea
                            value={value}
                            className={styles.textAreaCust}
                            onChange={e => setValue(e.target.value)}
                            placeholder="Ask me anything about your business data..."
                            autoSize={{ minRows: 3, maxRows: 7 }}
                        />
                        <div className={styles.iconsBar}>
                            <div className={styles.iconsBarLeft}>
                                    <div>
                                        <Database height={15}/>
                                    </div>
                                    <div>
                                        <Calendar height={15}/>
                                    </div>
                            </div>
                            <div className={styles.iconsBarRight}>
                                    <div>
                                       <Mic height={15}/>
                                    </div>
                                    <div onClick={()=> sendMessage(value)} >
                                        <Send height={15}/>
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
            {f.label}
          </button>
        ))}
      </div>

      {/* Questions Grid */}
      <div className={styles.questionsGrid}>
        {questionsData[activeFilter].map((q, idx) => (
          <button key={idx} className={styles.questionCard}>
            {q}
          </button>
        ))}
      </div>
    </div>
       </div>
    </div>
  )
}
