import React from 'react';
import styles from '../../styles/NormalButton.module.scss';

interface ButtonProps {
  className?: string;
  onClick: () => void; // 클릭 이벤트 핸들러
}

const MyNormalButton: React.FC<ButtonProps> = ({ className, onClick }) => {
  return (
    <button className={`${styles.NormalButton} ${className}`} onClick={onClick}>
      일반
    </button>
  );
};

export default MyNormalButton;
