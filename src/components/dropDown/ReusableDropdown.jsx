import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

export const ReusableDropdown = ({ label, options, value, onChange, required = false, placeholder = 'Select', style = {} }) => {
  return (
    <div className="mb-3">
      {label && (
        <label className="form-label" style={{ marginBottom: 4, display: 'block' }}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <Select
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ width: 200, ...style }}
      >
        {options.map((opt, index) => (
          <Option key={index} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </Option>
        ))}
      </Select>
    </div>
  );
};
