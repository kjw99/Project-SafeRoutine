import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ManageBar from '../components/manage/ManageBar';
import axios from 'axios';
import AXIOS from '../constants/constAxios';
import Invite from '../components/invite/invitetab';
import { format } from 'date-fns';
import ProgressBar from '../components/input/Chart'


interface StatResult {
  name: string;
  count: number;
  email: string;
}



const Stat = () => {
  const { teamId } = useParams(); // `useParams`의 반환 타입이 `string | undefined`일 수 있음
  const [teamStats, setTeamStats] = useState<any[]>([]);  
  const [statResults, setStatResults] = useState<StatResult[]>([]);

  useEffect(() => {
    // 팀 통계 정보 가져오기

    axios.post(`${AXIOS.BASE_URL}/users/myteam`, '', {
      headers: {
        "Content-Type": "application/json",
        "Authorization": sessionStorage.getItem("access-token")
      }
    })
    .then(response => {
      setTeamStats(response.data);
    })
    .catch(error => {
      console.error('Error fetching team data:', error.response ? error.response.data : error);
    });





    if (teamId) {
      // UTC 시간대의 현재 날짜를 ISO 문자열로 변환
      const createDate = format(new Date(), 'yyyy-MM-dd');


  
      const requestData = {
        teamId: parseInt(teamId, 10), // `teamId`를 안전하게 정수로 변환
        createDate, // UTC 시간대 기준 날짜
      };
  
      axios.post(`${AXIOS.BASE_URL}/team/manager/check/submitList`, requestData, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": sessionStorage.getItem("access-token")
        }
      })
      .then(response => {
        if (Array.isArray(response.data)) {
          setStatResults(response.data);
        } else {
          console.warn('Received non-array response:', response.data);
          setStatResults([]);
        }
      })
      .catch(error => {
        console.error('Error fetching stat data:', error);
        setStatResults([]);
      });
    }
  }, [teamId]);

  return (
    <div style={{ paddingTop: '135px' }}>
      <ManageBar/>
      {teamStats.length > 0 && <Invite teamData={teamStats[0]} />}

      {statResults.length ? (
        <div>
          <h1>팀 통계 정보</h1>
          <ul>
          {Array.isArray(statResults) && statResults.map((stat, index) => (
            <li key={index}>{`${stat.email}: ${stat.count} / 5`}     <br /><br />      <ProgressBar/> <br />
            </li>
          ))}
          <br />
          {/* <ProgressBar/> */}
          </ul>
        </div>
      ) : (
        <p>통계 정보를 불러오는 중...</p>
      )}
    </div>
  );
};

export default Stat;
