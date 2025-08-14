import React from 'react'
import {
  Typography,
  Select,
  DatePicker,
  Button,
  Badge,
  Space,
  Segmented,
} from 'antd';
import {
  EditOutlined,
  ReloadOutlined,
  SaveOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { IoMenu } from "react-icons/io5";
import { LuBrain } from "react-icons/lu";
import styles from './ChatSubNav.module.css'

export const ChatSubNav = ({isSidebarExpanded, setIsSidebarExpanded}) => {
  return (
    <div className={styles.container}>
      
      <div style={{ margin: '15px'}}>
<IoMenu />
      </div>
      <div style={{  margin: '15px'}}>
        <Segmented
          // options={['Chat', 'Build', 'Data']}
          options={['Chat']}
          defaultValue="Chat"
          style={{ background: '#f9f9f9',borderRadius: 5  }}
        />

      </div>
      <div style={{  margin: '15px'}} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
        <LuBrain />
      </div>
    </div>
  )
}
