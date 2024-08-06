package com.example.saferoutine.dto;

import lombok.Builder;

public class TeamWithdrawRequestDTO {
    private String email;
    private String password;
    private Long teamId;
    @Builder
    public TeamWithdrawRequestDTO(String email, String password, Long teamId) {
        this.email = email;
        this.password = password;
        this.teamId = teamId;
    }
    public TeamUserDTO getTeamMemberInfo(){
        return TeamUserDTO.builder()
                .teamId(teamId)
                .memberEmail(email)
                .build();
    }

    public UserAuthDTO getUserInfo(){
        return UserAuthDTO.builder()
                .email(email)
                .password(password)
                .build();
    }

}
