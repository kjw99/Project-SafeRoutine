
  import React, { useEffect, useState } from 'react';
  import { useParams } from 'react-router-dom';
  import ManageBar from '../components/manage/ManageBar';
  import axios from 'axios';
  import AXIOS from '../constants/constAxios';
  import Container from '../components/card/CardContainer';
  
  
  const Checkstore = () => {
    const { teamId } = useParams();
    const [teamStats, setTeamStats] = useState(null);
    useEffect(() => {
      if (teamId) {
        const requestBody = {
          teamId: parseInt(teamId, 10), // teamId를 Int 형태로 변환합니다. useParams로 가져온 값은 문자열이므로 parseInt를 사용합니다.
          createDate: new Date().toISOString(), // ISO 8601 형식의 현재 날짜 및 시간을 문자열로 생성합니다.
        };
  
        axios.post(AXIOS.BASE_URL + `/team/manager/check/submitList`, requestBody, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": sessionStorage.getItem("access-token"),
          }
        })
          .then(response => {
            setTeamStats(response.data);
          })
          .catch(error => {
            console.error('Error fetching team data:', error.response ? error.response.data : error);
          });
      }
    }, [teamId]); // useEffect 의존성 배열 내부로 이동
  
    return (
      <div style={{ paddingTop: '180px' }}>
        <ManageBar />
        <h1>체크리스트</h1>
        
        {teamStats ? (
          <div>
            <ul>
              <Container />
            </ul>
          </div>
        ) : (
          <p>통계 정보를 불러오는 중...</p>
        )}
      </div>
    );
  };
  
  export default Checkstore;