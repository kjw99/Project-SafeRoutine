// import React, { useState } from 'react';
// import styles from '../../styles/LiveStream.module.scss';

// const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
//   if (!isOpen) return null;

//   return (
//     <>
//       <div className={styles.LiveOverlay} onClick={onClose}></div>
//       <div className={styles.LiveModal}>
//         <h2>화상회의방 소집</h2>
//         <div className={styles.ModalContainer}>
//           <label>회의 일정<input type="text" /></label><br />
//           <label>회의 안건<input type="text" /></label><br />
//           <label>추가 공지사항<input type="text" /></label>
//         </div>
//         <div>
//           <button onClick={onClose}>취소</button>
//           <button onClick={onClose}>전송 and 개설</button>
//         </div>
//       </div>
//     </>
//   );
// };

// const VideoConferenceModal: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const joinConference = () => {
//     // 화상회의방 참가 로직 구현
//     console.log('화상회의방에 참가합니다.');
//   };

//   return (
//     <div className={styles.invitePerson}>
//       <Modal isOpen={isModalOpen} onClose={closeModal} />
//       <div className={styles.buttonsContainer}>
//         <button onClick={openModal}>소집 및 개설</button>
//         <button onClick={joinConference} disabled={!isModalOpen}>회의 참가</button>
//       </div>
//     </div>
//   );
// };

// export default VideoConferenceModal;

import React, { useState } from 'react';
import styles from '../../styles/LiveStream.module.scss';

const Modal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className={styles.LiveOverlay} onClick={onClose}></div>
      <div className={styles.LiveModal}>
        <h2 className={styles.ModalTitle}>화상회의방 소집</h2>
        <div className={styles.ModalContainer}>
          <div className={styles.InputGroup}>
            <label>회의 일정</label>
            <input type="text" placeholder="09:00 ~ 10:00" />
          </div>
          <div className={styles.InputGroup}>
            <label>회의 안건</label>
            <input type="text" placeholder="금일 중요 메일에 관하여" />
          </div>
          <div className={styles.InputGroup}>
            <label>추가 공지사항</label>
            <input type="text" placeholder="전 공지를 참고 바랍니다." />
          </div>
        </div>
        <div className={styles.ButtonContainer}>
          <button className={styles.CancelButton} onClick={onClose}>취소</button>
          <button className={styles.ConfirmButton} onClick={onClose}>전송 and 개설</button>
        </div>
      </div>
    </>
  );
};

const VideoConferenceModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const joinConference = () => {
    // 화상회의방 참가 로직 구현
    console.log('화상회의방에 참가합니다.');
  };

  return (
    <div className={styles.invitePerson}>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
      <div className={styles.buttonsContainer}>
        <button onClick={openModal}>소집 및 개설</button>
        <button onClick={joinConference} disabled={!isModalOpen}>회의 참가</button>
      </div>
    </div>
  );
};

export default VideoConferenceModal;
