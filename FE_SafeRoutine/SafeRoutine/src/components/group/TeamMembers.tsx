import React, { useState, useEffect } from 'react';
import GroupListBar from '../manage/GroupListBar'; // GroupListBar 컴포넌트를 import하세요.

interface MemberClass {
    id: number;
    teamId: number;
    userHashId: string | null;
    memberEmail: string;
    memberName: string;
    memberPosition: string;
    teamPriority: number;
  }
  

  const TeamMembers: React.FC = () => {
    const [members, setMembers] = useState<MemberClass[]>([]);
    const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  
    useEffect(() => {
      fetch('/testGroup.json')
        .then(response => response.json())
        .then((data: MemberClass[]) => setMembers(data))
        .catch(error => console.error("Failed to load team data:", error));
    }, []);
  
    const teams = members.reduce((acc: { teamId: number; memberName: string; }[], member) => {
      const exists = acc.some(item => item.teamId === member.teamId);
      if (!exists) {
        acc.push({ teamId: member.teamId, memberName: member.memberName });
      }
      return acc;
    }, []);
  
    const filteredMembers = selectedTeamId ? members.filter(member => member.teamId === selectedTeamId) : members;
  
    const handleSelectTeam = (teamId: number) => {
      setSelectedTeamId(teamId);
    };
  
    return (
      <div>
      <GroupListBar onSelectTeam={handleSelectTeam} teams={teams} />
        {filteredMembers.map((member: MemberClass) => (
          <div key={member.id}>{member.memberName}</div>
        ))}
      </div>
    );
  };
  
  export default TeamMembers;