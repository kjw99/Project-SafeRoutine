import React, { useState } from 'react';
import styles from '../../styles/MemberIndi.module.scss';


import stylesManager from '../../styles/ManagerButton.module.scss';
import stylesNormal from '../../styles/NormalButton.module.scss';
import stylesBan from '../../styles/BanButton.module.scss';

import manageStore from '../../utils/manageAxios';
import SubmitCheckList from '../../pages/SubmitCheckList'
import { format } from 'date-fns';
interface GroupMemberProps {
  id: number;
  teamId: number;
  memberEmail: string;
  memberName: string;
  memberPosition: string;
}


const AxiosGroupMember: React.FC<GroupMemberProps> = ({ teamId, memberEmail, memberName, memberPosition }) => {
  // 관리자일 경우 Manager 버튼 스타일
  const managerButtonStyle = memberPosition === 'manager' ? styles.managerStyle : '';
  // 일반 사용자일 경우 Normal 버튼 스타일
  const normalButtonStyle = memberPosition === 'normal' ? styles.normalStyle : '';

  const [isClick, setIsClick] = useState(false);
  
  const handleManagerBtn = async () => {
    const rslt = manageStore.manageUpdate({
      teamId : teamId,
      memberEmail : memberEmail,
      memberPosition : 'manager'
    })
    if(await rslt === "SUCCESS") window.location.reload(); 
  }
  const handleNormalBtn = async () =>{
    const rslt = manageStore.manageUpdate({
      teamId : teamId,
      memberEmail : memberEmail,
      memberPosition : 'normal'
    })
    if(await rslt === "SUCCESS") window.location.reload(); 
  }
  const handleDeleteBtn = async () =>{
    const isConfirmed = window.confirm('해당 사용자를 그룹에서 추방하시겠습니까?');

    if (isConfirmed) {
      try {
        // 백엔드에 데이터 삭제 요청
        const rslt = manageStore.manageWithDraw({
          teamId : teamId,
          memberEmail : memberEmail,
          memberPosition : ''
        })
        
        if (await rslt==="SUCCESS") {
          alert('사용자가 성공적으로 추방되었습니다.');
          window.location.reload();
          // 필요한 추가 처리, 예: 사용자 목록 업데이트
        } else {
          alert('사용자 추방에 실패했습니다.');
        }
      } catch (error) {
        console.error('추방 처리 중 오류 발생:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }

   
  }
  
  const showCheckList = () => {
    setIsClick(prevState => !prevState);
  }
  
  if(isClick){
    return (
      <div>
        <div className={styles.TeamMemberContainer} onClick={showCheckList}>
          <div className={styles.TeamMemberDetail}>{teamId}</div>
          <div className={styles.TeamMemberDetail}>{memberName}</div>
          <div className={styles.TeamMemberDetail}>{memberPosition}</div>
          <div className={styles.TeamMemberButtons}>
            <div className={styles.TeamMemberButton}>
              <button onClick={handleManagerBtn} className={`${managerButtonStyle} ${stylesManager.ManagerButton}`}> 관리자 </button>
            </div>
            <div className={styles.TeamMemberButton}>
              <button onClick={handleNormalBtn} className={`${normalButtonStyle} ${stylesNormal.NormalButton}`}> 일반 </button>
            </div>
            <div className={styles.TeamMemberButton}>
              <button onClick={handleDeleteBtn} className={stylesBan.BanButton}> 추방 </button>
            </div>
          </div>
        </div>
        <SubmitCheckList teamId={teamId} createDate={format(new Date(), 'yyyy-MM-dd')} userEmail={memberEmail} />
      </div>
    );
  } else {
    return (
      <div className={styles.TeamMemberContainer} onClick={showCheckList}>
        <div className={styles.TeamMemberDetail}>{teamId}</div>
        <div className={styles.TeamMemberDetail}>{memberName}</div>
        <div className={styles.TeamMemberDetail}>{memberPosition}</div>
        <div className={styles.TeamMemberButtons}>
          <div className={styles.TeamMemberButton}>
            <button onClick={handleManagerBtn} className={`${managerButtonStyle} ${stylesManager.ManagerButton}`}> 관리자 </button>
          </div>
          <div className={styles.TeamMemberButton}>
            <button onClick={handleNormalBtn} className={`${normalButtonStyle} ${stylesNormal.NormalButton}`}> 일반 </button>
          </div>
          <div className={styles.TeamMemberButton}>
            <button onClick={handleDeleteBtn} className={stylesBan.BanButton}> 추방 </button>
          </div>
        </div>
      </div>
    );
  }
}  

export default AxiosGroupMember;
