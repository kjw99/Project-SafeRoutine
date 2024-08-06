import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CheckCardFunc from '../card/CheckCard';
import { useParams } from 'react-router-dom';
import styles from '../../styles/Card.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import AXIOS from '../../constants/constAxios';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';


interface CheckCardProps {
  _id: { $oid: string };
  id:string;
  teamId: number;
  checkListName: string;
  resetTime: string;
  checkListRow?: any; // 추가된 타입, 구체적인 타입으로 수정 필요
  checkListBackUpDate: string;

}

const NewChecklistButton: React.FC = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  return (
    <div className={styles.SingleCard}>
      <button className={styles.MakeChecklistButton} onClick={() => navigate(`/group/${teamId}/makenewchecklist`)}>
        새로운 체크리스트 만들기
      </button>
    </div>
  );
};


const Container: React.FC = () => {
  const [cardsData, setCardsData] = useState<CheckCardProps[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { teamId } = useParams<{ teamId: string }>();

  useEffect(() => {
    if (teamId) {
      const requestBody = {
        teamId: parseInt(teamId, 10),
      };

      axios.post(`${AXIOS.BASE_URL}/team/manager/check/list`, requestBody, {
        headers: {
          "Content-Type": "application/json", 
          "Authorization": sessionStorage.getItem("access-token"),
        }
      })
      .then((response) => {
        setCardsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setLoading(false);
      });
    }
  }, [teamId]);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: false,
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.CardContainer}>
      <Slider {...settings}>
        {cardsData.map((card) => (
          <CheckCardFunc 
            key={card.id}
            _id={card._id}
            teamId={card.teamId}
            resetTime={card.resetTime}
            checkListName={card.checkListName}
            checkListRow={card.checkListRow} // 추가된 프로퍼티
            checkListBackUpDate={card.checkListBackUpDate}
          />
        ))}
        <NewChecklistButton key="new-checklist-button" />
      </Slider>
    </div>
  );
};

export default Container;
