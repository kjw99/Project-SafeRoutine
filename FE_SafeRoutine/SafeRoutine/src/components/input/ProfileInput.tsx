// ProfileInput.tsx
import React from 'react';

interface ProfileInputProps {
  name: string;
  value?: string; // value를 옵션으로 지정
  marginRight?: string;
  onChange: (value: string) => void;
}

const ProfileInput: React.FC<ProfileInputProps> = ({ name, value, marginRight, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    onChange(newValue);
  };

  return (
    <div style={{marginBottom :'15px'}}>
      <label style={{ marginRight: marginRight || '10px' }}>{name}</label>
      <input
      
        type="text"
        value={value}
        onChange={handleChange}
        style={{
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          border: '2px solid lightgray',
          borderRadius: '10px',
          height :'30px',
          width : '200px'
        }}
      />
    </div>
  );
}

export default ProfileInput;
