import React, { useState, useEffect } from 'react';
import AxiosGroupMember from '../group/AxiosGroupMember';
import styles from '../../styles/GroupMember.module.scss'
import mainStore from '../../utils/mainAxios';
import { useParams } from 'react-router-dom';

interface GroupMemberProps {
  id: number;
  teamId: number;
  memberEmail: string;
  memberName: string;
  memberPosition: string;
}

const MemberBlock: React.FC = () => {
  const [cardsData, setCardsData] = useState<GroupMemberProps[]>([]);
  const {teamId} = useParams();
  useEffect(() => {

    const fetchData = async () => {
      try{
        if(teamId != undefined){
          const rslt = await mainStore.teamManage({
            teamName : "",
            teamIntro : "",
            teamId : parseInt(teamId,10),
            teamImage : "",
          });
          if(rslt) setCardsData(rslt);
        }
      }catch{
      }
    }
    fetchData();
  }, []);

  return (
    <div className={styles.GroupMember} >
      {cardsData.map((card: GroupMemberProps) => (
        <div>
          <AxiosGroupMember
            key={card.id.toString()}
            id={card.id}
            teamId={card.teamId}
            memberName={card.memberName}
            memberEmail={card.memberEmail}
            memberPosition={card.memberPosition}
          />
        </div>
      ))}
 
    </div>
  );
};

export default MemberBlock;
