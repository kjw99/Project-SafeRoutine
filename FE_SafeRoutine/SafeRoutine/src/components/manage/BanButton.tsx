import React from 'react';
import styles from '../../styles/BanButton.module.scss';

interface BanButtonProps {
  userId?: string; // 추방할 사용자의 고유 ID를 props로 전달받음
  onClick: () => void; // onClick prop 추가

}

const BanButton: React.FC<BanButtonProps> = ({ userId }) => {
  const handleBanClick = async () => {
    // 사용자에게 경고창을 표시하여 추방 여부를 확인
    const isConfirmed = window.confirm('해당 사용자를 그룹에서 추방하시겠습니까?');

    if (isConfirmed) {
      try {
        // 백엔드에 데이터 삭제 요청
        const response = await fetch(`YOUR_BACKEND_ENDPOINT/${userId}`, {
          method: 'DELETE', // DELETE 메서드 사용
          // 필요한 경우 인증 헤더 추가
        });

        if (response.ok) {
          alert('사용자가 성공적으로 추방되었습니다.');
          // 필요한 추가 처리, 예: 사용자 목록 업데이트
        } else {
          alert('사용자 추방에 실패했습니다.');
        }
      } catch (error) {
        console.error('추방 처리 중 오류 발생:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
      }
    }
  };

  return (
    <button className={styles.BanButton} onClick={handleBanClick}>추방</button>
  );
};

export default BanButton;
