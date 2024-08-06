export interface GroupMemberProps {
    id: number;
    teamId: number;
    memberEmail: string;
    memberName: string;
    memberPosition: string;
    teamPriority?: number; // 선택적 속성으로 정의
  }