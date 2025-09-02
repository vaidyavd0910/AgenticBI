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
  Calendar,
  Tooltip,
  message
} from "antd";
import bmw from "../../assets/bmw-logo.svg";
import styles from "./ChatSubNav.module.css";
import {
  Bookmark,
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
import { addQuestion, saveMultiChat } from "../../service/Api";
import { ExpandCollapseSection } from "../expandCollapse/ExpandCollapseSection";
import html2pdf from "html2pdf.js";   // ✅ use html2pdf.js
import { showToast } from "../../utils/helperFunctions/toastFunction";

export const ChatSubNav = ({
  sendMessage,
  setMessages,
  messages,
  restartChat,
  setDataset,
  setTimerange,
  dataset,
  timerange,
  title,
  setTitle,
  contextMemory,
  variables,
   setIsSessionSaved
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState([]);
  const [popularQuestions, setPopularQuestions] = useState([]);
  const [kpiQuestions, setKpiQuestions] = useState([]);

  // ✅ FIXED PDF Export
  const downloadChatAsPDF = () => {
    const element = document.getElementById("chat-container");

    const sessionName = title.replace(/\s+/g, "_");
    const now = new Date();
    const timestamp = now
      .toISOString()
      .replace(/T/, "_")
      .replace(/:/g, "-")
      .split(".")[0];
    const fileName = `${sessionName}_${timestamp}.pdf`;

    const opt = {
      margin: 10,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    html2pdf().set(opt).from(element).save();
  };

  const menuItems = (
    <Menu>
      <Menu.Item key="1">
        <Bookmark height={"15"} color={"gray"} /> Pin this Insight
      </Menu.Item>
      <Menu.Item key="2">
        <Share2Icon height={"15"} color={"gray"} /> Share Session
      </Menu.Item>
      <Menu.Item key="3" onClick={downloadChatAsPDF}>
        <Download height={"15"} color={"gray"} /> Export Analysis
      </Menu.Item>
    </Menu>
  );

  const datasetMenu = (
    <Menu onClick={({ key }) => setDataset(key)}>
      <span className={styles.menuTitle}>Dataset</span>
      <Menu.Item key="All Datasets">All Datasets</Menu.Item>
      <Menu.Item key="Sales Dataset">Sales Dataset</Menu.Item>
      <Menu.Item key="Customer Dataset">Customer Dataset</Menu.Item>
      <Menu.Item key="Marketing Dataset">Marketing Dataset</Menu.Item>
      <Menu.Item key="Financial Dataset">Financial Dataset</Menu.Item>
    </Menu>
  );

  const timeMenu = (
    <Menu onClick={({ key }) => setTimerange(key)}>
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

  const handleSaveSession = async () => {
    try {
      const queries = [];
      for (let i = 0; i < messages.length; i++) {
        const msg = messages[i];
        if (msg.sender === "user") {
          const botReply = messages[i + 1];
          if (botReply && botReply.sender === "bot") {
            queries.push({
              user_query: msg.text,
              dataset: botReply.dataset || dataset || "Unknown Dataset",
              timerange: botReply.timerange || timerange || "Not specified",
              response: {
                summary: botReply.summary,
                insights: botReply.insights,
                table: botReply.table,
                graph: botReply.graph,
                context_memory: botReply.contextMemory,
                Variables_Detected: botReply.variablesDetected,
              },
            });
          }
        }
      }

      const res = await saveMultiChat(title, queries);
      showToast(`Session saved: ${res.session_name}`, "success");
       setIsSessionSaved(true);
      message.success(`Session saved: ${res.session_name}`);
      console.info("Save response:", res);
    } catch (err) {
      message.error("Failed to save session");
      console.error(err);
    }
  };

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
            <div
              className={styles.crossButton}
              onClick={() => setIsEditing(false)}
            >
              <X height={"15"} color={"red"} />
            </div>
          </>
        ) : (
          <>
            <h5 className={styles.textHeading} style={{ margin: 0 }}>
              {title}
            </h5>
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
        <div className={styles.selectedTags}>
          {dataset && (
            <div className={styles.tag}>
              {dataset}
              <X
                className={styles.closeIcon}
                onClick={() => setDataset(null)}
              />
            </div>
          )}
          {timerange && (
            <div className={styles.tag}>
              {timerange}
              <X
                className={styles.closeIcon}
                onClick={() => setTimerange(null)}
              />
            </div>
          )}
        </div>

        <Tooltip title="Refresh Analysis">
          <div onClick={restartChat} className={styles.icons}>
            <RefreshCw height={"15"} />
          </div>
        </Tooltip>

        <Tooltip title="Save Session">
          <div className={styles.icons} onClick={handleSaveSession}>
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

        <Tooltip>
          <div className={styles.icons} onClick={() => setOpen(!open)}>
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

        <Tooltip title="BMW">
          <div className={styles.bmwLogo}>
            <img src={bmw} alt="BMW Logo" style={{ height: "22px" }} />
          </div>
        </Tooltip>

        {open && (
          <div className={styles.panel}>
            <div className={styles.header}>
              <span>Context & Insights</span>
            </div>

            {/* Context Memory */}
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

            {/* Variables Detected */}
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

            {/* Suggested Questions */}
            <ExpandCollapseSection
              title={
                <h4 className={styles.sectionTitle}>
                  <Lightbulb height={15} /> Suggested Questions
                </h4>
              }
            >
              {suggestedQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className={styles.questionItem}
                  onClick={() => sendMessage(q, dataset, timerange)}
                >
                  {q}
                </div>
              ))}
            </ExpandCollapseSection>

            {/* Popular Questions */}
            <ExpandCollapseSection
              title={
                <h4 className={styles.sectionTitle}>
                  <TrendingUp height={15} /> Popular Questions
                </h4>
              }
            >
              {popularQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className={styles.questionItem}
                  onClick={() => sendMessage(q, dataset, timerange)}
                >
                  {q}
                </div>
              ))}
            </ExpandCollapseSection>

            {/* KPI Questions */}
            <ExpandCollapseSection
              title={
                <h4 className={styles.sectionTitle}>
                  <ChartColumnIncreasing height={15} /> KPI Questions
                </h4>
              }
            >
              {kpiQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className={styles.questionItem}
                  onClick={() => sendMessage(q, dataset, timerange)}
                >
                  {q}
                </div>
              ))}
            </ExpandCollapseSection>
          </div>
        )}
      </div>
    </div>
  );
};
