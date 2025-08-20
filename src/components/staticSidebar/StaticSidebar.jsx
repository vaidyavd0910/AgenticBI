import React from "react";
import styles from "./StaticSidebar.module.css"; // Import as module
import { LogOut, MessageSquare, Plus, Settings } from "lucide-react";
import { LuTrello } from "react-icons/lu";
import logo from '../../assets/Logo.svg';
import { useNavigate } from "react-router-dom";

const StaticSidebar = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.sidebar}>
      <div className={styles.upperContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo" className={styles.logo} />
        </div>

        <div>
          <div className={styles.sidebarItem}>
            <div className={styles.tabContainer}
             onClick={() => navigate("/")}
              style={{ cursor: "pointer" }}>
              <div className={styles.icon}><Plus height={'15'} /></div>
              <span className={styles.textInStatic}>New</span>
            </div>

            {/* ✅ Navigate to /chatAnalysis on click */}
            <div
              className={styles.tabContainer}
              onClick={() => navigate("/chatAnalysis")}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.icon}><MessageSquare height={'15'} /></div>
              <span className={styles.textInStatic}>Chat</span>
            </div>

            <div className={styles.tabContainer}>
              <div className={styles.icon}><Settings height={'15'} /></div>
              <span className={styles.textInStatic}>Setup</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.logoutContainer}>
        <div className={styles.tabContainer}>
          <div className={styles.icon}><LogOut height={'15'} /></div>
          <span className={styles.textInStatic}>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default StaticSidebar;
