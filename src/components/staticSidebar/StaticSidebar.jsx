import React, { useState } from "react";
import styles from "./StaticSidebar.module.css"; 
import { LogOut, MessageSquare, Plus, Settings } from "lucide-react";
import logo from '../../assets/Logo.svg';
import { useNavigate } from "react-router-dom";

const StaticSidebar = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState("new"); // default tab

  const handleSelect = (tab, path) => {
    setSelected(tab);       // ✅ update state
    navigate(path);         // ✅ navigate to path
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.upperContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <div className={styles.sidebarItem}>
          <div
            className={`${styles.tabContainer} ${selected === "new" ? styles.active : ""}`}
            onClick={() => handleSelect("new", "/")}
          >
            <div className={styles.icon}><Plus height={15} /></div>
            <span className={styles.textInStatic}>New</span>
          </div>

          <div
            className={`${styles.tabContainer} ${selected === "chat" ? styles.active : ""}`}
            onClick={() => handleSelect("chat", "/chatAnalysis")}
          >
            <div className={styles.icon}><MessageSquare height={15} /></div>
            <span className={styles.textInStatic}>Chat</span>
          </div>

          <div
            className={`${styles.tabContainer} ${selected === "setup" ? styles.active : ""}`}
            onClick={() => handleSelect("setup", "/setup")}
          >
            <div className={styles.icon}><Settings height={15} /></div>
            <span className={styles.textInStatic}>Setup</span>
          </div>
        </div>
      </div>

      <div className={styles.logoutContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.icon}><LogOut height={15} /></div>
          <span className={styles.textInStatic}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default StaticSidebar;
