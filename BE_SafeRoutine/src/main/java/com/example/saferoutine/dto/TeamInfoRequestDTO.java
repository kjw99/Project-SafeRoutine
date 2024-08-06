package com.example.saferoutine.dto;

import com.example.saferoutine.db.enums.PositionType;
import lombok.Builder;

public class TeamInfoRequestDTO {
    private String email;
    private String password;
    private Long teamId;
    private String memberEmail;
    private PositionType memberPosition;
    @Builder
    public TeamInfoRequestDTO(String email, String password, Long teamId, String memberEmail, PositionType memberPosition) {
        this.email = email;
        this.password = password;
        this.teamId = teamId;
        this.memberEmail = memberEmail;
        this.memberPosition = memberPosition;
    }
    public TeamUserDTO getTeamMemberInfo(){
        return TeamUserDTO.builder()
                .teamId(teamId)
                .memberEmail(email)
                .build();
    }
    public TeamUserDTO getWithdrawTeamMemberInfo(){
        return TeamUserDTO.builder()
                .teamId(teamId)
                .memberEmail(memberEmail)
                .build();
    }
    public TeamUserDTO getUpdateTeamMemberInfo(){
        return TeamUserDTO.builder()
                .teamId(teamId)
                .memberEmail(memberEmail)
                .memberPosition(memberPosition)
                .build();
    }
    public UserAuthDTO getUserInfo(){
        return UserAuthDTO.builder()
                .email(email)
                .password(password)
                .build();
    }
}
