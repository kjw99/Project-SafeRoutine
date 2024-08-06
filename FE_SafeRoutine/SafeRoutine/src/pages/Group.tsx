import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ModalOption from '../components/modal/Modal';
import ImageLogo from '../assets/imagelogo.png';
import GroupCard from '../components/group/GroupCard'; // GroupCard 컴포넌트 경로가 맞는지 확인
import styles from '../styles/GroupCard.module.scss'; // 스타일 시트 경로가 맞는지 확인
import AXIOS from '../constants/constAxios';
import S3_STORE from '../utils/imageAxios';
import mainStore from '../utils/mainAxios';

interface Team {
  teamId: number;
  teamName: string;
  teamLink: string;
  teamIntro: string;
  teamImage: string;
  teamLinkExpireDate: Date;
}


const Group: React.FC = () => {
  
  const [teams, setTeams] = useState<Team[]>([]);
  const [isCreateGroupModalOpen, setCreateGroupModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [teamName, setteamName] = useState('');
  const [teamIntro, setteamIntro] = useState('');

  const [teamImage, setteamImage] = useState<File | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string>('');



  useEffect(() => {
    axios.post(AXIOS.BASE_URL +`/users/myteam`,'',{headers: {
      "Content-Type" : "application/json",
      "Authorization" : sessionStorage.getItem("access-token"),
  }})
      .then((response) => setTeams(response.data))
      .catch((error) => console.error('Error loading team data:', error));
  }, []);

  

  const handleCreateTeam = async () => {
    if (teamName && teamIntro && uploadedImageUrl) {
      try {
        const teamInfo = {  // mainProps 인터페이스 타입 선언 제거
          teamName: teamName,
          teamIntro: teamIntro,
          teamImage: uploadedImageUrl,
          // teamId와 teamLink 속성 제거
        };
        await mainStore.teamCreate(teamInfo);
        setCreateGroupModalOpen(false); // 모달 닫기
        // 팀 리스트 업데이트 로직
      } catch (error) {
        console.error('팀 생성 오류:', error);
      }
    } else {
      alert('팀 이름, 소개 및 이미지를 모두 입력해주세요.');
    }
  };

  const handleCreateGroupModalOpen = () => setCreateGroupModalOpen(true);
  const handleCreateGroupModalClose = () => setCreateGroupModalOpen(false);


  // 이미지 변경 처리 함수
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setteamImage(file);

    if (file) {
      const fileName = await S3_STORE.selfImageUpload(file); // S3_STORE를 사용하여 이미지 업로드
      setUploadedImageUrl(fileName); // 업로드된 이미지 URL을 상태에 저장
    }
  };


  const handleImageClick = () => {
    // 파일 선택 창 열기
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };



  const createGroupModalContent = (
   
    <div className={styles.modalGroupFix}> 
      <h2>그룹 생성</h2>
      <div className={styles.modalContent}>
        <div className={styles.ModalGroupLeft}>
          <img
            className={styles.ImageLogo}
            src={teamImage ? URL.createObjectURL(teamImage) : ImageLogo}
            alt="Group Logo"
            onClick={handleImageClick}
          />
          <p onClick={handleImageClick}>사진/첨부하기</p>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        <div className={styles.ModalGroupRight}>
          <div>
            <p>그룹명</p>
            <input
              type="text"
              placeholder="그룹명을 입력하세요"
              className={styles.AlertSend}
              value={teamName}
              onChange={(e) => setteamName(e.target.value)}
            />
          </div>
          <div>
            <p>그룹소개</p>
            <textarea
              placeholder="그룹에 대한 설명을 입력하세요"
              className={styles.AlertSend}
              value={teamIntro}
              onChange={(e) => setteamIntro(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.EditCompleteButton}>
            <button onClick={handleCreateTeam}>생성완료</button>
          </div>
        </div>
      </div>
    </div>
  );



  
  return (
    <div  style={{ paddingTop: '200px' }}>
      <h2>그룹 리스트</h2>
      <div>
        <button className={styles.makeGroup} onClick={handleCreateGroupModalOpen}> 그룹 생성</button>
      </div>
      <hr />
      <div className={styles.bigcontainer} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        
        {teams.map((team) => (
          
          <GroupCard
            key={team.teamId}
            imageUrl={team.teamImage === "image" ? '' : team.teamImage}
            teamName={team.teamName}
            teamIntro={team.teamIntro}
            teamId={team.teamId}
            teamLink={team.teamLink}
            numberDisplay={5}
            teamLinkExpireDate={team.teamLinkExpireDate}
          />
        ))}
      </div>

      <ModalOption
        isOpen={isCreateGroupModalOpen}
        onClose={handleCreateGroupModalClose}
        content={createGroupModalContent}
        customWidth="550px"
        customHeight="530px"
      />

    </div>
  );
};

export default Group;
