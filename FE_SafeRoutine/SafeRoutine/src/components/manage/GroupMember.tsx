import React, { useState } from 'react';
import styles from '../../styles/GroupMember.module.scss';
import MagniIcon from '../../assets/magni.png';
import MyManagerButton from '../../components/manage/MyManagerButton';
import MyNormalButton from '../../components/manage/MyNormalButton';
import BanButton from './BanButton';

const Member: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>('');
  const [isBanModalOpen, setBanModalOpen] = useState(false);


  const handleSelectButton = (buttonType: string) => {
    setSelectedButton(buttonType);
  };

  const handleBanClick = () => {
    setBanModalOpen(true)
  }


  return (
    <div className={styles.GroupMember}>
      <div className={styles.MemberInfo}>
        회원 이름
        <img className={styles.MagniIcon} src={MagniIcon} alt="" />
      </div>
      <div className={styles.Author}>
      <MyManagerButton
        className={`${selectedButton === 'manager' ? styles.SelectedButtonStyle : ''} ${styles.ManagerButton}`}
        onClick={() => handleSelectButton('manager')}
      />
      <MyNormalButton
        className={`${selectedButton === 'normal' ? styles.SelectedButtonStyle : ''} ${styles.NormalButton}`}
        onClick={() => handleSelectButton('normal')}
      />
      <BanButton onClick={handleBanClick}/>
      </div>  

    {/* 추방 모달 */}
    {isBanModalOpen && (
      <div className={styles.modalOverlay}>
        <div className={styles.modalContent}>
          <p>정말 추방하시겠습니까?</p>
          <button onClick={() => setBanModalOpen(false)}>예</button>
          <button onClick={() => setBanModalOpen(false)}>아니오</button>
        </div>
      </div>
    )}
  </div>
);
};
export default Member;
