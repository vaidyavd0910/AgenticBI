import React, { useState } from 'react';
import styles from './ChatResponseCard.module.css';
import { ButtonComponent } from '../button/ButtonComponent';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const ChatResponseCard = ({
  question,
  insights = [],
  onAddToDashboard = () => console.log("Handling add to dashboard"),
  onExportResult = () => console.log("Handling export Result"),
  onCustomize = () => console.log("Handling customize"),
}) => {
  const [expanded, setExpanded] = useState(true);

  const chartData = [
	{
		name: 'Page A',
		uv: 4000,
	},
	{
		name: 'Page B',
		uv: 3000,
	},
	{
		name: 'Page C',
		uv: 2000,
	},
	{
		name: 'Page D',
		uv: 2780,
	},
	{
		name: 'Page E',
		uv: 1890,
	},
	{
		name: 'Page F',
		uv: 2390,
	},
	{
		name: 'Page G',
		uv: 3490,
	},
	];

  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardHeader}>
        <div>
          Based on your query about {question}, here are the key insights from your sales data:
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

      <div className={styles.chartPlaceholder}>
        {/* <i className="bi bi-bar-chart fs-3"></i> */}
        {/* <p className="mb-0">Interactive chart visualization would appear here</p> */}
		{/* <ResponsiveContainer width="100%" height="100%"> */}
			<LineChart
				width={500}
				height={300}
				data={chartData}
				margin={{
				top: 5,
				right: 30,
				left: 20,
				bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Line type="monotone" dataKey="uv" stroke="#82ca9d" />
			</LineChart>
			{/* </ResponsiveContainer> */}
      </div>

      {expanded && (
        <div className={styles.insightsBox}>
          <h6 className={styles.insightsTitle}>Key Insights:</h6>
          <ul>
            {insights?.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
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