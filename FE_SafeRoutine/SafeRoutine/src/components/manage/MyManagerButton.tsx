import React from 'react';
import styles from '../../styles/ManagerButton.module.scss';

interface ButtonProps {
  className?: string;
  onClick: () => void; // 클릭 이벤트 핸들러
}

const MyManagerButton: React.FC<ButtonProps> = ({ className, onClick }) => {
  return (
    <button className={`${styles.ManagerButton} ${className}`} onClick={onClick}>
      관리자
    </button>
  );
};

export default MyManagerButton;
