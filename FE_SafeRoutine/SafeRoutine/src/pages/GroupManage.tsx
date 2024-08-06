import React from 'react';
import Block from '../components/manage/MemberBlock';
import styles from '../styles/GroupManage.module.scss';
import ManageBar from '../components/manage/ManageBar'

const GroupManage = () => {
  
  return (
    <div style={{ paddingTop: '180px' }}>
      <ManageBar />
      <div className={styles.Header}>
        <h2 className={styles.Title}>그룹관리</h2>

      </div>      
        <Block/>
  
    </div>
  );
};

export default GroupManage;
