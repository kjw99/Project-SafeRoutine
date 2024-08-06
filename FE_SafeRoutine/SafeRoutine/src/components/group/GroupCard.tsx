import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../../styles/GroupCard.module.scss";
import { useDispatch } from 'react-redux';
import {
  openInfoModal, openDropModal, openDeleteModal, openAlarmModal
} from '../../stores/ModalSlice';
import AXIOS from "../../constants/constAxios.ts";
import mainStore from '../../utils/mainAxios.tsx';


interface GroupCardProps {
  imageUrl: string;
  teamName: string;
  teamIntro: string;
  teamId: number;
  numberDisplay: number;
  onClick?: () => void;
  teamLink: string;
  teamLinkExpireDate:Date;
}

const GroupCard: React.FC<GroupCardProps> = ({
    imageUrl,
    teamName,
    teamIntro,
    teamId,
  }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOptionsButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsMenuOpen((prev) => !prev);
    event.stopPropagation();
  };

  const handleMenuItemClick = async (option: string, event: React.MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(false);
    event.stopPropagation();

    if (option === "그룹 정보") {
      dispatch(openInfoModal());
    } else if (option === "그룹 탈퇴") {
      dispatch(openDropModal());
      
      await mainStore.teamWithDraw({ teamId: teamId });


    } else if (option === "그룹 삭제") {
      dispatch(openDeleteModal());
      await mainStore.teamDestroy({ teamId : teamId });


    } else {
      dispatch(openAlarmModal());
    }};

  const handleBackdropClick = () => {
    setIsMenuOpen(false);
  };


  const handleXButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMenuOpen(false);
    // 이벤트 전파를 방지하여 상위 요소로의 이벤트 전파를 막음
    event.stopPropagation();
  };

  const handleCardClick = async () => {
    try {
      const response = await axios.post(`${AXIOS.BASE_URL}/main/position-auth`, {
        teamId,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': sessionStorage.getItem('access-token'),
        },
      });
      const role = response.data;

      if (role === "manager") {
        navigate(`${teamId}/stat`);
      } else {
        navigate(`${teamId}/user`);
      }
    } catch (error) {
      console.error('Error checking role:', error);
    }
  };
  return (
    <div className={styles.groupCard} onClick={handleCardClick}>
      <img src={imageUrl} alt="Group Image" className={styles.groupImage} />
      <h3 className={styles.teamName}>{teamName}</h3>
      <p className={styles.numberDisplay}></p>
      <p className={styles.teamIntro}>{teamIntro}</p>
      <div className={styles.optionsContainer}>
        <button className={styles.optionsButton} onClick={handleOptionsButtonClick}>...</button>
        {isMenuOpen && (
          <div className={styles.menu} onClick={handleBackdropClick}>
            <div className={styles.xButton} onClick={handleXButtonClick}>x</div>
            <div className={styles.menuItem} onClick={(event) => handleMenuItemClick("그룹 탈퇴", event)}>그룹 탈퇴</div>
            <div className={styles.menuItem} onClick={(event) => handleMenuItemClick("그룹 삭제", event)}>그룹 삭제</div>
          </div>
        )}
      </div>
      {/* Modal 컴포넌트들 */}
    </div>
  );
};

export default GroupCard;
