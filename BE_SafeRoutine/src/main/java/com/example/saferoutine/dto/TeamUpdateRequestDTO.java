package com.example.saferoutine.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Getter
@Setter
public class TeamUpdateRequestDTO {
    private Long teamId;
    private String manageUserEmail;
    private String manageUserPassword;
    private Date teamLinkExpireDate;
    private String teamName;
    private String teamLink;
    private String teamIntro;
    private String teamImage;
    @Builder
    public TeamUpdateRequestDTO(Long teamId, String manageUserEmail, String manageUserPassword, Date teamLinkExpireDate, String teamName, String teamLink, String teamIntro, String teamImage) {
        this.teamId = teamId;
        this.manageUserEmail = manageUserEmail;
        this.manageUserPassword = manageUserPassword;
        this.teamLinkExpireDate = teamLinkExpireDate;
        this.teamName = teamName;
        this.teamLink = teamLink;
        this.teamIntro = teamIntro;
        this.teamImage = teamImage;
    }

//    public TeamUpdateDTo getTeamInfo(){
//        return teamUpdateDTO..builder()
//                .teamId(teamId)
//                .teamName(teamName)
//                .teamLink(teamLink)
//                .teamIntro(teamIntro)
//                .teamImage(teamImage)
//                .teamLinkExpireDate(teamLinkExpireDate)
//                .build();
//    }
//    public UserAuthDTO get UserInfo(){
//        return userAuthDTO.builder()
//                .email(manageUserEmail)
//                .password(manageUserPassword)
//                .build();
//    }
//    public TeamMemberAuthDTO getTeamMemberInfo(){
//        return teamMemberDTO.builder()
//                .teamId(teamId)
//                .teamName(teamName)
//                .memberEmail(manageUserEmail)
//                .build();
//    }


}
