import React, { useEffect, useState } from "react";
import {
  Select,
  DatePicker,
  Button,
  Badge,
  Space,
  Segmented,
  Menu,
  Dropdown,
  Input,
  Calendar
} from "antd";
import bmw from "../../assets/bmw-logo.svg";
import { Tooltip } from "antd"; // ✅ import Tooltip
import styles from "./ChatSubNav.module.css";
import {
  Bookmark,
  Brain,
  Calendar1,
  ChartColumnIncreasing,
  Check,
  Database,
  Download,
  Ellipsis,
  Lightbulb,
  Pen,
  RefreshCw,
  Save,
  Share2Icon,
  TrendingUp,
  X,
} from "lucide-react";
import { addQuestion } from "../../service/Api";
import { ExpandCollapseSection } from "../expandCollapse/ExpandCollapseSection";


export const ChatSubNav = ({ isSidebarExpanded, setIsSidebarExpanded, sendMessage, setSearchInput,setValue , setMessages}) => {
  const [title, setTitle] = useState("Analysis Session");
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
    const [suggestedQuestions, setSuggestedQuestions] = useState([]);
    const [popularQuestions, setPopularQuestions] = useState([]);
    const [kpiQuestions, setKpiQuestions] = useState([]);
   const [selectedDataset, setSelectedDataset] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
    const contextMemory = [
      { label: "Time Period:", value: "Last 30 days" },
      { label: "Dataset:", value: "Sales Dataset" },
      { label: "Region Filter:", value: "North America" },
      { label: "Product Category:", value: "All Categories" },
    ];
  
    const variables = ["Revenue", "Growth Rate", "Region", "Category", "Time Period"];
  const menuItems = (
  <Menu>
    <Menu.Item key="1">
      <Bookmark height={"15"} color={"gray"} /> Pin this Insight
    </Menu.Item>
    <Menu.Item key="2">
      <Share2Icon height={"15"} color={"gray"} /> Share Session
    </Menu.Item>
    <Menu.Item key="3">
      <Download height={"15"} color={"gray"} /> Export Analysis
    </Menu.Item>
  </Menu>
);
const datasetMenu = (
    <Menu onClick={({ key }) => setSelectedDataset(key)}>
      <span className={styles.menuTitle}>Dataset</span>
      <Menu.Item key="All Datasets">All Datasets</Menu.Item>
      <Menu.Item key="Sales Dataset">Sales Dataset</Menu.Item>
      <Menu.Item key="Customer Dataset">Customer Dataset</Menu.Item>
      <Menu.Item key="Marketing Dataset">Marketing Dataset</Menu.Item>
      <Menu.Item key="Financial Dataset">Financial Dataset</Menu.Item>
    </Menu>
  );

  const timeMenu = (
    <Menu onClick={({ key }) => setSelectedTime(key)}>
      <span className={styles.menuTitle}>Time Range</span>
      <Menu.Item key="All Time">All Time</Menu.Item>
      <Menu.Item key="Last 7 days">Last 7 days</Menu.Item>
      <Menu.Item key="Last 30 days">Last 30 days</Menu.Item>
      <Menu.Item key="Last 90 days">Last 90 days</Menu.Item>
      <Menu.Item key="Last year">Last year</Menu.Item>
    </Menu>
  );


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
    }, []); 

  const handleTitleEdit = () => setIsEditing(true);
  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleTitleSave = () => setIsEditing(false);

  return (
    <div className={styles.container}>
      <div className={styles.editText}>
        {isEditing ? (
          <>
            <Input
              value={title}
              onChange={handleTitleChange}
              onPressEnter={handleTitleSave}
              onBlur={handleTitleSave}
              style={{ fontSize: 12, width: 300 }}
              autoFocus
            />
            <div className={styles.checkButton} onClick={handleTitleSave}>
              <Check height={"15"} color={"green"} />
            </div>
            <div className={styles.crossButton} onClick={() => setIsEditing(false)}>
              <X height={"15"} color={"red"} />
            </div>
          </>
        ) : (
          <>
            {/* ✅ Plain text instead of Typography.Title */}
            <h5 className={styles.textHeading} style={{ margin: 0 }}>{title}</h5>
            <div className={styles.editButton} onClick={handleTitleEdit}>
              <Pen height={"15"} />
            </div>
            <Badge
              count="Active"
              style={{
                backgroundColor: "#f6f7f8",
                marginLeft: 8,
                color: "black",
              }}
            />
          </>
        )}
      </div>


   <div className={styles.rightSection}>
     {/* ✅ Selected Tags (max 2) */}
      <div className={styles.selectedTags}>
        {selectedDataset && (
          <div className={styles.tag}>
            {selectedDataset}
            <X className={styles.closeIcon} onClick={() => setSelectedDataset(null)} />
          </div>
        )}
        {selectedTime && (
          <div className={styles.tag}>
            {selectedTime}
            <X className={styles.closeIcon} onClick={() => setSelectedTime(null)} />
          </div>
        )}
      </div>
  <Tooltip title="Refresh Analysis">
    <div onClick={() => sendMessage("", true)} className={styles.icons}>
      <RefreshCw height={"15"} />
    </div>
  </Tooltip>

  <Tooltip title="Save Session">
    <div className={styles.icons}>
      <Save height={"15"} />
    </div>
  </Tooltip>

  <Tooltip title="Select Dataset">
    <div className={styles.icons}>
      <Dropdown overlay={datasetMenu} trigger={["click"]} placement="topLeft">
        <Database height={15} style={{ cursor: "pointer" }} />
      </Dropdown>
    </div>
  </Tooltip>

  <Tooltip title="Select Time Range">
    <div className={styles.icons}>
      <Dropdown overlay={timeMenu} trigger={["click"]} placement="topLeft">
        <Calendar1 height={15} style={{ cursor: "pointer" }} />
      </Dropdown>
    </div>
  </Tooltip>

  {/* <Tooltip title={isSidebarExpanded ? "Hide Insights" : "Show Insights"}>
    <div
      className={styles.icons}
      onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
    >
      <Lightbulb height={"15"} />
    </div>
  </Tooltip> */}
    <Tooltip >
    <div
      className={styles.icons}
      onClick={() => setOpen(!open)}
    >
      <Lightbulb height={"15"} />
    </div>
  </Tooltip>

  <Tooltip title="More Options">
    <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
      <div className={styles.icons}>
        <Ellipsis height={"15"} />
      </div>
    </Dropdown>
  </Tooltip>

  <Tooltip title="BMW" >
    <div className={styles.bmwLogo}>
      <img src={bmw} alt="BMW Logo" style={{ height: "22px" }} />
    </div>
  </Tooltip>
{/* </div> */}
        {/* <div className={styles.bmwLogo}>
          <img src={bmw} alt="BMW Logo" style={{ height: "22px" }} />
        </div> */}
         <div className={styles.wrapper}>
      {/* Bulb Button */}
      {/* <button
        className={styles.bulbButton}
        onClick={() => setOpen(!open)}
      >
        💡
      </button> */}

      {/* Context & Insights Panel */}
   {open && (
  <div className={styles.panel}>
    <div className={styles.header}>
             <span>Context & Insights</span>
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
                     <ExpandCollapseSection title={<h4 className={styles.sectionTitle}><Lightbulb height={15}/>Suggested Questions</h4>}>
                             {suggestedQuestions.map((q, idx) => (
                               <div key={idx} className={styles.questionItem} onClick={() => setMessages(q)}>
                                 {q}
                               </div>
                             ))}
                           </ExpandCollapseSection>
                   
                           {/* <div className={styles.section}> */}
                             <ExpandCollapseSection title={<h4 className={styles.sectionTitle}><TrendingUp height={15} />Popular Questions</h4>}>
                             {popularQuestions.map((q, idx) => (
                               <div key={idx} className={styles.questionItem} onClick={() => setValue(q)}>
                                 {q}
                               </div>
                             ))}
                        </ExpandCollapseSection>
                   
                           {/* </div> */}
                   
                           {/* <div className={styles.section}> */}
                             <ExpandCollapseSection title={<h4 className={styles.sectionTitle}><ChartColumnIncreasing height={15}/>KPI Questions</h4>}>
                             {kpiQuestions.map((q, idx) => (
                               <div key={idx} className={styles.questionItem} onClick={() => {
  setMessages([{ sender: "user", text: q }]);
  sendMessage(q);
}}>
                                 {q}
                               </div>
                             ))}
                        </ExpandCollapseSection>
  </div>
)}

    </div>
  
      </div>
    </div>
  );
};
