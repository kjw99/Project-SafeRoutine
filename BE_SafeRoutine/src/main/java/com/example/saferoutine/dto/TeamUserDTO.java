package com.example.saferoutine.dto;

import com.example.saferoutine.db.entity.TeamMember;
import com.example.saferoutine.db.enums.PositionType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TeamUserDTO {
    private Long id;
    private Long teamId;
    private String userHashId;
    private String memberEmail;
    private String memberName;
    private PositionType memberPosition;
    private int teamPriority;
    @Builder
    public TeamUserDTO(Long id, Long teamId, String userHashId, String memberEmail, String memberName, PositionType memberPosition, int teamPriority) {
        this.id = id;
        this.teamId = teamId;
        this.userHashId = userHashId;
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberPosition = memberPosition;
        this.teamPriority = teamPriority;
    }

    public TeamMember toEntity(){
        return TeamMember.builder()
                .id(id)
                .teamId(teamId)
                .userHashId(userHashId)
                .memberEmail(memberEmail)
                .memberName(memberName)
                .memberPosition(memberPosition)
                .teamPriority(teamPriority)
                .build();
    }
}
