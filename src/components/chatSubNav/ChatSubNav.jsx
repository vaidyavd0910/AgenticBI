import React, { useState } from "react";
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
import styles from "./ChatSubNav.module.css";
import {
  Bookmark,
  Brain,
  Calendar1,
  Check,
  Database,
  Download,
  Ellipsis,
  Lightbulb,
  Pen,
  RefreshCw,
  Save,
  Share2Icon,
  X,
} from "lucide-react";

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
  <Menu width={'150px'}>
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
  <Menu width={'150px'}>
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

export const ChatSubNav = ({ isSidebarExpanded, setIsSidebarExpanded, sendMessage }) => {
  const [title, setTitle] = useState("Analysis Session");
  const [isEditing, setIsEditing] = useState(false);

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
        <div onClick={() => sendMessage("", true)} className={styles.icons}>
          <RefreshCw height={"15"} />
        </div>
        <div className={styles.icons}>
          <Save height={"15"} />
        </div>
      <div className={styles.icons}>
        <Dropdown overlay={datasetMenu} trigger={['click']} placement="topLeft">
          <Database height={15} style={{ cursor: "pointer" }} />
        </Dropdown>
      </div>
        <div className={styles.icons}>
          {/* <Calendar1 height={"15"} /> */}
          <Dropdown overlay={timeMenu} trigger={['click']} placement="topLeft">
           <Calendar1 height={15} style={{ cursor: "pointer" }} />
        </Dropdown>
        </div>
        <div className={styles.icons} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
          <Lightbulb height={"15"} />
        </div>
        <Dropdown overlay={menuItems} trigger={["click"]} placement="bottomRight">
          <div className={styles.icons}>
            <Ellipsis height={"15"} />
          </div>
        </Dropdown>
        <div className={styles.bmwLogo}>
          <img src={bmw} alt="BMW Logo" style={{ height: "22px" }} />
        </div>
      </div>
    </div>
  );
};
