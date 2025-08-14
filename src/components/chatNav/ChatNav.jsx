import React, { useState } from 'react';
import { Typography, Input, Dropdown, Menu } from 'antd';
import { ReusableDropdown } from '../dropDown/ReusableDropdown';
import styles from './ChatNav.module.css';
import {
  Database,
  Calendar,
  AlignJustify,
  Monitor,
  SearchCheck,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

const { Title } = Typography;

const dataSetDropDown = [
  { value: 'opt1', label: 'Sales Dataset' },
  { value: 'opt2', label: 'Marketing Dataset' },
  { value: 'opt3', label: 'Customer Dataset' },
];

const calendarDropDown = [
  { value: 'opt1', label: 'Today' },
  { value: 'opt2', label: 'This Week' },
  { value: 'opt3', label: 'This Month' },
  { value: 'opt4', label: 'This Quarter' },
];

export const ChatNav = () => {
  const [selectedDataset, setSelectedDataset] = useState('');
  const [selectedCalendar, setSelectedCalendar] = useState('');

  const handleDatasetChange = (value) => {
    setSelectedDataset(value);
    console.log('Selected dataset:', value);
  };

  const handleCalendarChange = (value) => {
    setSelectedCalendar(value);
    console.log('Selected calendar:', value);
  };

  const themeMenu = (
    <Menu
      onClick={(e) => console.log('Theme selected:', e.key)}
      items={[
        {
          key: 'light',
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Sun size={16} /> Light
            </span>
          ),
        },
        {
          key: 'dark',
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Moon size={16} /> Dark
            </span>
          ),
        },
        {
          key: 'system',
          label: (
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Laptop size={16} /> System
            </span>
          ),
        },
      ]}
    />
  );

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
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <div className={styles.menuButton}>
            <AlignJustify height={'15'} />
          </div>

          <div>
            <Input
              placeholder="Search analysis..."
              allowClear
              prefix={<SearchCheck height={'15'} color='grey' />}
              className={styles.custSearch}
              style={{
                width: 300,
                borderRadius: 6,
              }}
            />
          </div>

          <div>
            <Database height={'15'} color={'grey'} />
          </div>
          <div>
            <ReusableDropdown
              label=""
              options={dataSetDropDown}
              value={selectedDataset}
              onChange={handleDatasetChange}
            />
          </div>

          <div>
            <Calendar height={'15'} color={'grey'} />
          </div>
          <div>
            <ReusableDropdown
              label=""
              options={calendarDropDown}
              value={selectedCalendar}
              onChange={handleCalendarChange}
            />
          </div>
        </div>
      </div>

      <Dropdown overlay={themeMenu} trigger={['click']} placement="bottomRight">
        <div className={styles.monitorButton} style={{ cursor: 'pointer', padding:"5px" }}>
          <Monitor height={'15'} />
        </div>
      </Dropdown>
    </div>
  );
};
