import React from 'react';
import styles from './ChatSectionLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';
// import StaticSidebar from '../../components/staticSidebar/staticSidebar';
import StaticSidebar from '../../components/staticSidebar/StaticSidebar';
export const ChatSectionLayout = ({ isSidebarExpanded, setIsSidebarExpanded }) => {
  return (
    <div className={styles.mainAppContainer}>
      <div className={styles.leftSidebar}>
        <StaticSidebar />
      </div>

      <div className={styles.mainContent}>
        <Outlet />
      </div>

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
