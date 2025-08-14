import React from 'react'
import styles from './ChatSectionLayout.module.css';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/sidebar/Sidebar';

export const ChatSectionLayout = ({isSidebarExpanded, setIsSidebarExpanded}) => {
	return (
		<div className={styles.mainAppContainer}>
			<div style={{flexGrow: 1}}>
				<Outlet />
			</div>
			<Sidebar isSidebarExpanded={isSidebarExpanded} setIsSidebarExpanded={setIsSidebarExpanded} />
		</div>
	)
}
