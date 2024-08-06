package com.example.saferoutine.dto;

import com.example.saferoutine.db.entity.Team;
import com.example.saferoutine.db.entity.TeamMember;
import lombok.Builder;

import java.util.UUID;
import java.util.Date;


public class TeamCreateRequestDTO {

    private Long teamId;
    private String creatorUserEmail;
    private String creatorUserPassword;
    private String teamName;
    private String teamLink;
    private String teamIntro;
    private String teamImage;
    private Date teamLinkExpireDate;
    @Builder
    public TeamCreateRequestDTO(Long teamId, String creatorUserEmail, String creatorUserPassword, String teamName, String teamLink, String teamIntro, String teamImage, Date teamLinkExpireDate) {
        this.teamId = teamId;
        this.creatorUserEmail = creatorUserEmail;
        this.creatorUserPassword = creatorUserPassword;
        this.teamName = teamName;
        this.teamLink = generateRandomTeamLink();
        this.teamIntro = teamIntro;
        this.teamImage = teamImage;
        this.teamLinkExpireDate = teamLinkExpireDate;
    }
    private String generateRandomTeamLink() {// 임의의 teamLink 생성
        return UUID.randomUUID().toString();
    }

    public TeamCreateDTO getTeamInfo() { // 팀 생성을 위한 DTO 생성 메소드
        return TeamCreateDTO.builder()
                .teamId(teamId)
                .teamName(teamName)
                .teamLink(teamLink)
                .teamIntro(teamIntro)
                .teamImage(teamImage)
                .teamLinkExpireDate(teamLinkExpireDate)
                .build();
    }

    public TeamUserDTO getTeamUserInfo(){ // 팀 맴버 생성을 위한 DTO 생성 메소드
        return TeamUserDTO.builder()
                .memberEmail(creatorUserEmail)
                .build();
    }

    public UserAuthDTO getRequestUserInfo(){
        return UserAuthDTO.builder()
                .email(creatorUserEmail)
                .password(creatorUserPassword)
                .build();
    }


}
