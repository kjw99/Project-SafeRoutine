// CheckInput.tsx
import React from 'react';
import styles from '../../styles/CheckInput.module.scss';
import DeleteImg from '../../assets/Delete.png'
interface CheckInputProps {
  content: string;
  checked: boolean;
  isAttach: boolean;
  onCheckboxChange: () => void;
  onRemoveItem: () => void;
  onContentClick: () => void; 

}

const CheckInput: React.FC<CheckInputProps> = ({ content, checked, onCheckboxChange, onRemoveItem, onContentClick,isAttach }) => {
 
  return ( 
    <>
    <p className={styles.attach} style={{ display: isAttach ? 'block' : 'none', margin: '0' }}>파일 첨부됨</p>
    <div className={styles.container}>
     
      <img src={DeleteImg} alt="" onClick={onRemoveItem} className={styles.del_img} />
      <input type="checkbox" checked={checked} onChange={onCheckboxChange} className={styles.check} />
      <div>
        <div className={styles.content} onClick={onContentClick}>{content}</div>
        
    </div>
      </div>
      
      </>
  );
};

export default CheckInput;
