import React, { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { ExpandCollapseSection } from '../expandCollapse/ExpandCollapseSection';
import { Typography } from 'antd';
import { X } from 'lucide-react';
import { addQuestion } from '../../service/Api';

const { Title } = Typography;

export const Sidebar = ({ isSidebarExpanded, setIsSidebarExpanded }) => {
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [kpiQuestions, setKpiQuestions] = useState([]);

  const contextMemory = [
    { label: "Time Period:", value: "Last 30 days" },
    { label: "Dataset:", value: "Sales Dataset" },
    { label: "Region Filter:", value: "North America" },
    { label: "Product Category:", value: "All Categories" },
  ];

  const variables = ["Revenue", "Growth Rate", "Region", "Category", "Time Period"];

  useEffect(() => {
    const getQuestions = async () => {
      try {
        const data = await addQuestion();
        setSuggestedQuestions(data.suggestion_questions || []);
        setPopularQuestions(data.Popular_Question || []);
        setKpiQuestions(data.KPI_Question || []);
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    getQuestions();
  }, []); // empty dependency array = runs once on mount

  return (
    <div className={isSidebarExpanded ? styles.sidebarExpanded : styles.sidebarHidden}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span>Context & Insights</span>
          <button className={styles.closeBtn} onClick={() => setIsSidebarExpanded(false)}>
            <X height={15}/>
          </button>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Context Memory</h4>
          <ul className={styles.list}>
            {contextMemory.map((item, idx) => (
              <li key={idx} className={styles.listItem}>
                {item.label} <strong>{item.value}</strong>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Variables Detected</h4>
          <div className={styles.tags}>
            {variables.map((variable, idx) => (
              <span key={idx} className={styles.tag}>
                {variable}
              </span>
            ))}
          </div>
        </div>

        <ExpandCollapseSection title={<h4 className={styles.sectionTitle}>Suggested Questions</h4>}>
          {suggestedQuestions.map((q, idx) => (
            <div key={idx} className={styles.questionItem}>
              {q}
            </div>
          ))}
        </ExpandCollapseSection>

        {/* <div className={styles.section}> */}
          <ExpandCollapseSection title={<h4 className={styles.sectionTitle}>Popular Questions</h4>}>
          {popularQuestions.map((q, idx) => (
            <div key={idx} className={styles.questionItem}>
              {q}
            </div>
          ))}
		  </ExpandCollapseSection>

        {/* </div> */}

        {/* <div className={styles.section}> */}
          <ExpandCollapseSection title={<h4 className={styles.sectionTitle}>KPI Questions</h4>}>
          {kpiQuestions.map((q, idx) => (
            <div key={idx} className={styles.questionItem}>
              {q}
            </div>
          ))}
		  </ExpandCollapseSection>

        {/* </div> */}
      </div>
    </div>
  );
};
