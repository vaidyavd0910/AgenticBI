import React, { useState } from 'react';
import {
  Typography,
  Select,
  DatePicker,
  Button,
  Badge,
  Input,
} from 'antd';
import {
  ReloadOutlined,
  SaveOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { IoArrowBackOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { GoDatabase } from "react-icons/go";
import { IoCalendarClearOutline } from "react-icons/io5";
import { ReusableDropdown } from '../dropDown/ReusableDropdown';
import styles from './ChatNav.module.css';
import { GoKebabHorizontal } from "react-icons/go";
import { Dropdown, Menu } from 'antd';

import { TbDeviceIpadPin } from "react-icons/tb";
import { FaLink } from "react-icons/fa6";
import { HiOutlineDownload } from "react-icons/hi";

const { Title } = Typography;

const dropdownOptions = [
  { value: 'opt1', label: 'Option 1' },
  { value: 'opt2', label: 'Option 2' },
  { value: 'opt3', label: 'Option 3' },
];
const menuItems = (
  <Menu>
    <Menu.Item key="1"><TbDeviceIpadPin /> Pin this Insight</Menu.Item>
    <Menu.Item key="2"><FaLink /> Share Session</Menu.Item>
    <Menu.Item key="3"><HiOutlineDownload /> Export Analysis</Menu.Item>
  </Menu>
);


export const ChatNav = () => {
  const [selectedOption, setSelectedOption] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('Q4 Sales Performance Deep Dive');

  const handleDropdownChange = (e) => {
    setSelectedOption(e.target.value);
  };

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
    <div
      style={{
        padding: '12px 24px',
        borderBottom: '1px solid #f0f0f0',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '50px'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className={styles.backButton}>
            <IoArrowBackOutline />
          </div>

          {isEditing ? (
            <>
             <Input
              value={title}
              onChange={handleTitleChange}
              onPressEnter={handleTitleSave}
              onBlur={handleTitleSave}
              style={{ fontSize: 12, width: 300 }}
              autoFocus
            /><div className={styles.editButton} onClick={handleTitleEdit}>
                <FiEdit2 />
              </div>
               <Badge
            count="Darft"
            style={{
              backgroundColor: '#1677ff',
              marginLeft: 8,
            }}
          />
            </>
           
            
          ) : (
            <>
              <Title level={5} style={{ margin: 0 }} className={styles.textHeading}>{title}</Title>
              <div className={styles.editButton} onClick={handleTitleEdit}>
                <FiEdit2 />
              </div>
               <Badge
            count="Saved"
            style={{
              backgroundColor: '#1677ff',
              marginLeft: 8,
            }}
          />
            </>
          )}

         
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <GoDatabase />
          <ReusableDropdown
            label=""
            options={dropdownOptions}
            value={selectedOption}
            onChange={handleDropdownChange}
          />
          <IoCalendarClearOutline />
           <ReusableDropdown
            label=""
            options={dropdownOptions}
            value={selectedOption}
            onChange={handleDropdownChange}
          />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <Button icon={<ReloadOutlined />}>Re-run Analysis</Button>
          <Button icon={<SaveOutlined />}>Save</Button>
          <Dropdown overlay={menuItems} trigger={['click']} placement="bottomRight">
  <div className={styles.menuButton} style={{ cursor: 'pointer' }}>
    <GoKebabHorizontal />
  </div>
</Dropdown>

        </div>
      </div>
    </div>
  );
};
