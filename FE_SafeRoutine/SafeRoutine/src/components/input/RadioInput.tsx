import React from 'react';

interface RadioInputProps {
  content: string;
  values: string[];
  selectedValue: string | null;
  onRadioChange: (value: string) => void;  // 수정: value 매개변수 추가
  onRemoveItem: () => void;
}

const RadioInput: React.FC<RadioInputProps> = ({ content, values, selectedValue, onRadioChange, onRemoveItem }) => {
  return (
    <div style={{ display: 'flex' }}>
      <img src="./src/assets/Delete.png" alt="" onClick={onRemoveItem} style={{ cursor: 'pointer' }} />
      {values.map((value) => (
        <div key={value}>
          <input type="radio" value={value} checked={selectedValue === value} onChange={() => onRadioChange(value)} />
          <label>{value}</label>
        </div>
      ))}
      <div>
        <label>{content}</label>
      </div>
    </div>
  );
};

export default RadioInput;
