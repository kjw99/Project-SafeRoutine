import React from 'react';
import listImage from '../../assets/line.png'; // 이 경로는 프로젝트에 맞게 조정해야 합니다.
import { Link, useNavigate, useParams  } from 'react-router-dom';
import styles from '../../styles/Manage.module.scss'; // 이 경로도 프로젝트에 맞게 조정해야 합니다.


const ManageBar: React.FC = () => {
  const navigate = useNavigate();
  const { teamId } = useParams(); // useParams 훅을 사용하여 URL 경로의 파라미터를 받아옵니다.


  // 이미지 클릭 시 /group 경로로 이동하는 함수입니다.
  const navigateToGroup = () => {
    navigate('/group');
  };

  return (
    <div className={styles.navblock}>
      <header className={styles.manageHeader}>
        <div className={styles.contents}>
          <img src={listImage} style={{ width: '50px', cursor: 'pointer', padding: 10 }} alt="Toggle" 
              onClick={navigateToGroup} />
          <nav className={styles.navigation}>

              <ul>
                <li>
                <Link to={`/group/${teamId}/stat`}>통계 확인</Link>
                </li>
                <li>
                <Link to={`/group/${teamId}/checkList`}>체크리스트 관리</Link>
                </li>
                <li>
                <Link to={`/group/${teamId}/groupmanage`}>그룹 관리</Link>
                </li>
              </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default ManageBar;
