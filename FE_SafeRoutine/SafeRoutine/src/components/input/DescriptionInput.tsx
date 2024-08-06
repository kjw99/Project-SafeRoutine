// DescriptionInput.tsx
import React, { ChangeEvent } from 'react';
import styles from '../../styles/DescriptionInput.module.scss';
import DeleteImg from '../../assets/Delete.png';

interface DescriptionInputProps {
  content: string;
  checked: boolean;
  type: string;
  onCheckboxChange: () => void;

  onInputChange: (value: string | File) => void; 
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  content,
  checked,
  onCheckboxChange,
  type,
  onInputChange,
}) => {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      onInputChange(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onInputChange(value);
  
  };

  return (
    <>
      <div className={styles.container}>
        <img src={DeleteImg} alt=""  className={styles.del_img} />
        {type === 'checkbox' && (
          <input type="checkbox" checked={checked} onChange={onCheckboxChange} className={styles.check} />
        )}

        <label className={styles.content}>
          {content}
        </label>
      </div>
      {type === 'img' && (
        <input type="file" onChange={handleFileChange} />
      )}
      {type === 'input' && (
        <input type="input" onChange={handleInputChange} />
      )}
    </>
  );
};

export default DescriptionInput;
