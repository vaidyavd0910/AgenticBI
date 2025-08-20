import React, { useState } from 'react'
import {
  Typography,
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
} from 'antd';
import bmw from '../../assets/bmw-logo.svg'
import styles from './ChatSubNav.module.css'
import { AlignJustify, AlignJustifyIcon, Bookmark, Brain, Calendar1, Check, Database, Download, Ellipsis, Lightbulb, Pen, RefreshCw, RotateCw, Save, Share2, Share2Icon, X } from 'lucide-react';
const menuItems = (
  <Menu>
    <Menu.Item key="1"><Bookmark height={'15'} color={'gray'}/> Pin this Insight</Menu.Item>
    <Menu.Item key="2"><Share2Icon height={'15'} color={'gray'}/> Share Session</Menu.Item>
    <Menu.Item key="3"><Download height={'15'} color={'gray'}/> Export Analysis</Menu.Item>
  </Menu>
);
const { Title } = Typography;

export const ChatSubNav = ({isSidebarExpanded, setIsSidebarExpanded, sendMessage}) => {
  const [title, setTitle] = useState('Analysis Session');
    const [isEditing, setIsEditing] = useState(false);
  
  const handleTitleEdit = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTitleSave = () => {
    setIsEditing(false);
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
              <div className={styles.checkButton } onClick={handleTitleEdit}>
                <Check height={'15'} color={'green'}/>
              </div>
              <div className={styles.crossButton}>
                <X height={'15'} color={'red'}/>
              </div>
              
            </>
           
            
          ) : (
            <>
              <Title level={5} style={{ margin: 0 }} className={styles.textHeading}>{title}</Title>
              <div className={styles.editButton} onClick={handleTitleEdit}>
              <Pen  height={'15'} />
              </div>
               <Badge
            count="Active"
            style={{
              backgroundColor: '#f6f7f8',
              marginLeft: 8,
              color:'black'
            }}
          />
            </>
          )}

         
      </div>
      <div>
        
      </div>
       {/* <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
                <Button icon={<RotateCw height={'15'}/>}>Re-run Analysis</Button>
                <Button icon={<Save height={'15'}/>}>Save</Button>
                <Dropdown overlay={menuItems} trigger={['click']} placement="bottomRight">
        <div className={styles.menuButton} style={{ cursor: 'pointer' }}>
         <Ellipsis height={'15'}/>
        </div>
      </Dropdown>
       <div style={{  margin: '15px'}} onClick={() =>'' } className={styles.refreshContainer}>
        <RefreshCw  height={'15'}/>
      </div>
       <div style={{  margin: '15px'}} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)} className={styles.brainIconContainer}>
        <Brain height={'15'}/>
      </div>
              </div>
            </div> */}
            <div className={styles.rightSection}>
             
               <div onClick={() =>sendMessage("", true)} className={styles.icons}>
                 <RefreshCw  height={'15'}/>
              </div>
       <div className={styles.icons}>
                <Save height={'15'}/>
              </div>
              <div className={styles.icons}>
                 <Database height={'15'} />
              </div>
              <div className={styles.icons}>
                 <Calendar1 height={'15'} />
              </div>
              <div className={styles.icons}>
                <Lightbulb height={'15'} onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}/>
              </div>
               <Dropdown overlay={menuItems} trigger={['click']} placement="bottomRight">
                <div className={styles.icons}>
                  <Ellipsis height={'15'}/>
                </div>
      </Dropdown>
               <img src={bmw} alt="BMW Logo" style={{ height: '25px'}} />
     
            </div>
     
    </div>
  )
}
