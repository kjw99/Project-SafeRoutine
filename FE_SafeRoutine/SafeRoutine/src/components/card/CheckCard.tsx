import React from 'react';
import styles from '../../styles/Card.module.scss';

interface Question {
  questionType: string;
  question: string;
}

interface CheckCardProps {
  _id: { $oid: string };
  teamId: number;
  checkListName: string;
  resetTime: string;
  checkListRow: Question[];
  checkListBackUpDate: string;
}

// CheckCardFunc 컴포넌트 구현
const CheckCardFunc: React.FC<CheckCardProps> = ({ teamId, resetTime, checkListName, checkListRow, checkListBackUpDate }) => {
  return (
    <div className={styles.SingleCard}>
      <div>Team ID: {teamId}</div>
      <div>Reset Time: {resetTime}</div>
      <div>Checklist Name: {checkListName}</div>
      {checkListRow.map((item, index) => (
        <div key={index}>
          <div>Question Type: {item.questionType}</div>
        </div>

      ))}
      <div> 생성일 : {checkListBackUpDate} </div>

    </div>
  );
};
export default CheckCardFunc;
