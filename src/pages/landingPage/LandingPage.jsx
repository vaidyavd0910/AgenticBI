import React, { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import bmw from '../../assets/bmw-logo.svg';
import { Calendar, ChartColumnIncreasing, Database, Lightbulb, Mic, Send, Sparkles, TrendingUp, X } from 'lucide-react';
import TextArea from 'antd/es/input/TextArea';
import { addQuestion, fetchQueryResult } from '../../service/Api';
import { useNavigate } from "react-router-dom";
import { Dropdown, Menu } from 'antd';
const datasetMenu = (
  <Menu width={'200px'}>
    <span style={{ margin: 0, padding: '5px', fontSize: "11px", fontWeight: 'bold', color: "gray" }}>Dataset</span>
    <Menu.Item key="all">All Datasets</Menu.Item>
    <Menu.Item key="sales">Sales Dataset</Menu.Item>
    <Menu.Item key="customer">Customer Dataset</Menu.Item>
    <Menu.Item key="marketing">Marketing Dataset</Menu.Item>
    <Menu.Item key="financial">Financial Dataset</Menu.Item>
  </Menu>
);

const timeMenu = (
  <Menu width={'200px'}>
    <span style={{ margin: 0, padding: '5px', fontSize: "11px", fontWeight: 'bold', color: "gray" }}>Time Range</span>
    <Menu.Item key="all">All Time</Menu.Item>
    <Menu.Item key="sales">Last 7 days</Menu.Item>
    <Menu.Item key="customer">Last 30 days</Menu.Item>
    <Menu.Item key="marketing">Last 90 days</Menu.Item>
    <Menu.Item key="financial">Last year</Menu.Item>
  </Menu>
);

// CSS module classes are lowercase, match them here
const quickFilters = [
  { label: "KPI", type: "kpi", icon: <ChartColumnIncreasing height={15}/> },
  { label: "Suggested", type: "suggested", icon: <Lightbulb height={15}/> },
  { label: "Popular", type: "popular", icon: <TrendingUp height={15} /> },
];
export const LandingPage = ({ sendMessage, setTimerange , setDataset , timerange , dataset  }) => {
  const [value, setValue] = useState('');
  const [activeFilter, setActiveFilter] = useState("");
  const [questionsData, setQuestionsData] = useState({ KPI: [], Suggested: [], Popular: [] });
  const navigate = useNavigate();

  // dataset menu handler
  const datasetMenu = (
     <Menu
    onClick={({ key }) => {
      // Replace the dataset selection (only one allowed)
      setDataset(key);
    }}
  >
      <span style={{ margin: 0, padding: '5px', fontSize: "11px", fontWeight: 'bold', color: "gray" }}>Dataset</span>
      <Menu.Item key="All Datasets">All Datasets</Menu.Item>
      <Menu.Item key="Sales Dataset">Sales Dataset</Menu.Item>
      <Menu.Item key="Customer Dataset">Customer Dataset</Menu.Item>
      <Menu.Item key="Marketing Dataset">Marketing Dataset</Menu.Item>
      <Menu.Item key="Financial Dataset">Financial Dataset</Menu.Item>
    </Menu>
  );

  // time range menu handler
  const timeMenu = (
    <Menu
    onClick={({ key }) => {
      // Replace the time selection (only one allowed)
      setTimerange(key);
    }}
  >
      <span style={{ margin: 0, padding: '5px', fontSize: "11px", fontWeight: 'bold', color: "gray" }}>Time Range</span>
      <Menu.Item key="All Time">All Time</Menu.Item>
      <Menu.Item key="Last 7 days">Last 7 days</Menu.Item>
      <Menu.Item key="Last 30 days">Last 30 days</Menu.Item>
      <Menu.Item key="Last 90 days">Last 90 days</Menu.Item>
      <Menu.Item key="Last year">Last year</Menu.Item>
    </Menu>
  );

  // Fetch questions from API
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await addQuestion();
        setQuestionsData({
          KPI: data.KPI_Question || [],
          Suggested: data.suggestion_questions || [],
          Popular: data.Popular_Question || [],
        });
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };
    getQuestions();
  }, []);

  const handleMsg = async () => {
    if (!value.trim()) return;

    sendMessage(value);
    setValue("");
    navigate("/chatPage");
    await fetchQueryResult(value,dataset,timerange);
  };

  return (
    <div>
      {/* Top Section */}
      <div className={styles.chatSuggestionContainer}>
        <div className={styles.header}>
          <div className={styles.bmwLogo}>
            <img src={bmw} alt="BMW Logo" style={{ height: '22px'}} />
          </div>
        </div>

        <div className={styles.analysisContainer}>
          <div className={styles.sparkle}>
            <Sparkles color={'#1890ff'} height={50} width={50} />
          </div>
          <p className={styles.title}>Start your analysis</p>
          <p className={styles.subtitle}>
            Ask any question about your data in natural language
          </p>
        </div>
      </div>

      {/* TextArea and Icons */}
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
                  <div className={styles.icons}><Mic height={15} /></div>
                  <button
                    onClick={handleMsg}
                    disabled={!value.trim()}
                    className={`${styles.sendBtn} ${!value.trim() ? styles.disabled : ""}`}
                  >
                    <Send height={15} />
                  </button>
                </div>
              </div>

             
            </div>
          </div>
          
        </div>
       <div className={styles.pillar}> 
 <div className={styles.selectedTags}>
  {[dataset, timerange].filter(Boolean).map((item) => (
    <div key={item} className={styles.tag}>
      {item}
      <X
        className={styles.closeIcon}
        onClick={() => {
          if (dataset === item) setDataset("");
          if (timerange === item) setTimerange("");
        }}
      />
    </div>
  ))}
</div>

</div>
      </div>

      {/* Quick Access Questions */}
      <div>
        <div className={styles.container}>
          <p className={styles.headingQuieck}>Quick access questions</p>
          <div className={styles.filterWrapper}>
            {quickFilters.map((f) => (
              <button
                key={f.label}
                onClick={() => setActiveFilter(f.label)}
                className={`${styles.filterBtn} ${styles[f.type]} ${
                  activeFilter.toLowerCase() === f.label.toLowerCase() ? styles.active : ""
                }`}
              >
                <div className={styles.filterNameConatiner}>
                  <span className={styles.filterIcon}>{f.icon}</span>
                  <span className={styles.filterName}>{f.label}</span>
                </div>
              </button>
            ))}
          </div>

          <div className={styles.questionsGrid}>
            {questionsData[activeFilter]?.map((q, idx) => (
              <button key={idx} className={styles.questionCard} onClick={() => setValue(q)}>
                {q}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
