import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../../styles/GroupListBar.module.scss';
import listImage from '../../assets/line.png';

const GroupListBar: React.FC<{
  onToggle?: () => void;
  onSelectTeam?: (teamId: number) => void ;
  teams?: Array<{
    teamId: number;
    memberName: string;
  }>;
}> = ({ onToggle, onSelectTeam, teams = [] }) => {
  // teamId 기반으로 중복 제거
  const uniqueTeams = Array.from(new Set(teams.map(team => team.teamId)))
    .map(teamId => {
      const team = teams.find(team => team.teamId === teamId);
      return {
        teamId: teamId,
        memberName: team ? team.memberName : `Team ${teamId}`,
      };
    });

  return (
    <div className={styles.newList}>
      <header className={styles.manageHeader}>
        <div className={styles.contents}>
          <img src={listImage} style={{ width: '50px', cursor: 'pointer', padding: 10 }} alt="Toggle" onClick={onToggle} />
          <nav className={styles.navigation}>
            <ul>
              {uniqueTeams.map((team, index) => (
                <li key={`${team.teamId}-${index}`} onClick={() => onSelectTeam?.(team.teamId)}>
                  <Link to={`/GroupManage/${team.teamId}`}>{team.teamId}팀</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default GroupListBar;

