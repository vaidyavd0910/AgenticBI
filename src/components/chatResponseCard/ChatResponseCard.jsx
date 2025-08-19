import React, { useState } from 'react';
import styles from './ChatResponseCard.module.css';
import { ButtonComponent } from '../button/ButtonComponent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Table } from 'antd';
import { ChartColumnIncreasing, Table as TableIcon, ChevronDown, ChevronUp } from 'lucide-react';

export const ChatResponseCard = ({
  summary,
  insights = [],
  chartData = [],
  tableData = [],
  onAddToDashboard = () => console.log("Handling add to dashboard"),
  onExportResult = () => console.log("Handling export Result"),
  onCustomize = () => console.log("Handling customize"),
}) => {
  const [expanded, setExpanded] = useState(true);
  const [displayGraph, setDisplayGraph] = useState(false);

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div className={styles.cardTitle}>{summary}</div>
        <div
          className={styles.readToggleBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? (
            <>Read Less <ChevronUp/></>
          ) : (
            <>Read More <ChevronDown/></>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <div className={styles.toggleBtnCOntainer}>
        <div onClick={() => setDisplayGraph(!displayGraph)} className={styles.toggleBtn}>
          {displayGraph ? <TableIcon height={16}/> : <ChartColumnIncreasing height={16} />}
        </div>
      </div>

      {/* Conditional Render */}
      {displayGraph ? (
        <div className={styles.chartPlaceholder}>
          <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="product1" stroke="#82ca9d" />
            <Line type="monotone" dataKey="product2" stroke="#be4c26ff" />
          </LineChart>
        </div>
      ) : (
        <div style={{ marginTop: '15px' }}>
          <Table
            columns={tableData?.columns}
            dataSource={tableData?.rows?.map((r, i) => ({ key: i, ...r }))}
            pagination={false}
            size="small"
          />
        </div>
      )}

      {expanded && insights && (
  <div className={styles.insightsBox}>
    <h6 className={styles.insightsTitle}>Key Insights:</h6>

    {/* Render key insights (object) */}
    {insights.key_insights && (
      <ul>
        {Object.entries(insights.key_insights).map(([key, value], i) => (
          <li key={i}>
            <strong>{key}:</strong> {value}
          </li>
        ))}
      </ul>
    )}

    {/* Render recommendations (array) */}
    {insights.recommendations && insights.recommendations.length > 0 && (
      <>
        <h6 className={styles.insightsTitle}>Recommendations:</h6>
        <ul>
          {insights.recommendations.map((rec, i) => (
            <li key={i}>{rec}</li>
          ))}
        </ul>
      </>
    )}
  </div>
)}

      <div className={styles.buttonGroup}>
        <ButtonComponent text="Add to Dashboard" variant="outlined" />
        <ButtonComponent text="Export Result" variant="outlined" />
        <ButtonComponent text="Customize" variant="outlined" />
      </div>
    </div>
  );
};
