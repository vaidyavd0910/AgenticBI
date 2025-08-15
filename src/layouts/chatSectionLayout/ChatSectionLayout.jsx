import React from 'react';
import styles from './ChatSectionLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
import StaticSidebar from '../../components/staticSidebar/staticSidebar';

export const ChatSectionLayout = ({ isSidebarExpanded, setIsSidebarExpanded }) => {
  return (
    <div className={styles.mainAppContainer}>
      {/* Left Fixed Sidebar */}
      <div className={styles.leftSidebar}>
        <StaticSidebar />
      </div>

      {/* Middle Content */}
      <div className={styles.mainContent}>
        <Outlet />
      </div>

      {/* Right Expandable Sidebar */}
      <div
        className={`${styles.rightSidebar} ${
          isSidebarExpanded ? styles.expanded : styles.collapsed
        }`}
      >
        <Sidebar
          isSidebarExpanded={isSidebarExpanded}
          setIsSidebarExpanded={setIsSidebarExpanded}
        />
      </div>
    </div>
  );
};
