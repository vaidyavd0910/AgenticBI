import React, { useState } from 'react';
import styles from './ChatResponseCard.module.css';
import { ButtonComponent } from '../button/ButtonComponent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Switch, Table } from 'antd';

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

  const onChange = (checked) => {
	setDisplayGraph(checked);	
  }

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div>
          {summary}
        </div>
        <di
          className={styles.readToggleBtn}
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ?
		   <>
				Read Less
				{/* <span style={{margin: "4px 0px 0px 5px"}}>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M7.247 4.86a.5.5 0 0 1 .706 0l4.096 4.096a.5.5 0 0 1-.708.708L8 5.707 4.659 9.168a.5.5 0 0 1-.708-.708L7.247 4.86z"/>
					</svg>
				</span> */}
		   </>:
		   <>
		    	Read More
				{/* <span>
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
					</svg>
				</span> */}
			</>
		}	
        </di>
      </div>

		<div className={styles.toggleBtnCOntainer}>
			<div>
				Table
				<Switch style={{margin: "0px 5px"}} defaultChecked value={displayGraph} onChange={onChange} />
				Graph
			</div>
		</div>

	  	{displayGraph ?
			<div className={styles.chartPlaceholder}>
				<LineChart
					width={500}
					height={300}
					data={chartData && chartData}
					margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
					}}
				>
					<CartesianGrid strokeDasharray="3 3" />
					<XAxis dataKey="date" />
					<YAxis />
					<Tooltip />
					<Legend />
					<Line type="monotone" dataKey="product1" stroke="#82ca9d" />
					<Line type="monotone" dataKey="product2" stroke="#be4c26ff" />
				</LineChart>
				{/* </ResponsiveContainer> */}
			</div>
			: 
			<div style={{ marginTop: '15px' }}>
				{/* <h4>Data Table</h4> */}
				<Table
				columns={tableData?.columns}
				dataSource={tableData?.rows.map((r, i) => ({
					key: i,
					...r
				}))}
				pagination={false}
				size="small"
				/>
			</div>	
		}

      {expanded && (
        <div className={styles.insightsBox}>
          <h6 className={styles.insightsTitle}>Key Insights:</h6>
          {Array.isArray(insights) ?
			<ul>
				{insights?.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
		  	: insights }
        </div>
      )}


      <div className={styles.buttonGroup}>
			<ButtonComponent text="Add to Dashboard" variant="outlined"/>
		  	<ButtonComponent text="Export Result" variant="outlined"/>
			<ButtonComponent text="Customize" variant="outlined"/>
      </div>
    </div>
  );
};