// input_line.tsx

import React, { ChangeEvent } from 'react';
import styles from '../../styles/InputLine.module.scss';
import CheckBox from '../../assets/check_box.png'
interface LineProps {
  placeholder: string;
  onChange: (value: string) => void;
}

const Line: React.FC<LineProps> = ({ placeholder, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={styles.input_line}>
      <img src={CheckBox} alt="" className={styles.check_box} />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input_style}
        onChange={handleChange}
      />
    </div>
  );
};

export default Line;
