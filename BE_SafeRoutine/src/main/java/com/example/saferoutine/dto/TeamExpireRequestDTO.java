package com.example.saferoutine.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
public class TeamExpireRequestDTO {
    private Long teamId;
    private String manageUserEmail;
    private String manageUserPassword;
    private Date teamLinkExpireDate;
    private String teamName;
    private String teamLink;
    private String teamIntro;
    private String teamImage;

    @Builder
    public TeamExpireRequestDTO(Long teamId, String manageUserEmail, String manageUserPassword, Date teamLinkExpireDate, String teamName, String teamLink, String teamIntro, String teamImage) {
        this.teamId = teamId;
        this.manageUserEmail = manageUserEmail;
        this.manageUserPassword = manageUserPassword;
        this.teamLinkExpireDate = teamLinkExpireDate;
        this.teamName = teamName;
        this.teamLink = teamLink;
        this.teamIntro = teamIntro;
        this.teamImage = teamImage;
    }
    public TeamExpireDTO getTeamInfo() { // 팀 가입기간 갱신을 위한 DTO 생성 메소드
        return TeamExpireDTO.builder()
                .teamId(teamId)
                .teamName(teamName)
                .teamLink(teamLink)
                .teamIntro(teamIntro)
                .teamImage(teamImage)
                .teamLinkExpireDate(teamLinkExpireDate)
                .build();
    }

    public TeamUpdateDTO getTeamUpdateInfo() { // 팀 정보 갱신을 위한 DTO 생성 메소드
        return TeamUpdateDTO.builder()
                .teamId(teamId)
                .teamName(teamName)
                .teamLink(teamLink)
                .teamIntro(teamIntro)
                .teamImage(teamImage)
                .teamLinkExpireDate(teamLinkExpireDate)
                .build();
    }

    public TeamUserDTO getTeamMemberInfo(){
        return TeamUserDTO.builder()
                .teamId(teamId)
                .memberEmail(manageUserEmail)
                .build();
    }
    public UserAuthDTO getUserInfo(){
        return UserAuthDTO.builder()
                .email(manageUserEmail)
                .password(manageUserPassword)
                .build();
    }
}