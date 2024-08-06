import React from 'react';
import styles from '../../styles/invite.module.scss';
import mainStore from '../../utils/mainAxios'; // mainStore의 정확한 경로를 확인하고 수정해주세요.

interface Team {
  teamId: number;
  teamName: string;
  teamLink: string;
  teamIntro: string;
  teamImage: string;
  teamLinkExpireDate: Date;
}

interface InviteProps {
  teamData: Team; // 부모 컴포넌트로부터 전달받는 `Team` 데이터
}

const Invite: React.FC<InviteProps> = ({ teamData }) => {
  // 초대 코드를 클립보드에 복사하는 함수
  const copyToClipboard = () => {
    if (teamData.teamLink) {
      navigator.clipboard.writeText(teamData.teamLink)
        .then(() => alert('초대코드가 클립보드에 복사되었습니다.'))
        .catch(err => console.error('클립보드 복사에 실패했습니다.', err));
    }
  };

  // 재발급 버튼을 눌렀을 때 실행될 함수
  const extension = async () => {
    try {
      await mainStore.teamRecruit({ teamId: teamData.teamId });
      alert('가입기간이 성공적으로 갱신되었습니다.');
      // 만료일이 갱신된 새로운 데이터로 UI를 업데이트해야 할 경우 추가 로직 구현
    } catch (error) {
      console.error('가입기간 갱신에 실패했습니다.', error);
      alert('가입기간 갱신에 실패했습니다.');
    }
  };

  // UI 렌더링
  return (
    <div className={styles.invitePerson}>
      <div className={styles.inviteCodeContainer}>
        <span>초대코드:</span>
        <span> {teamData.teamLink}</span>
      </div>
      <div className={styles.buttonsContainer}>
        <span>만료일: {new Date(teamData.teamLinkExpireDate).toLocaleDateString()}</span>
        <button onClick={extension}>재발급</button> {/* 재발급 버튼에 extension 함수 연결 */}
        <button onClick={copyToClipboard}>복사</button>
      </div>
    </div>
  );
};

export default Invite;

