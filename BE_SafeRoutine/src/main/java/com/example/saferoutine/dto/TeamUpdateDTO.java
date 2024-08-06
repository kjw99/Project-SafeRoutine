package com.example.saferoutine.dto;

import com.example.saferoutine.db.entity.Team;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


import java.util.Date;
@Getter
@Setter
public class TeamUpdateDTO {
    private Long teamId;
    private Date teamLinkExpireDate;
    private String teamName;
    private String teamLink;
    private String teamIntro;
    private String teamImage;

    @Builder
    public TeamUpdateDTO(Long teamId, Date teamLinkExpireDate, String teamName, String teamLink, String teamIntro, String teamImage) {
        this.teamId = teamId;
        this.teamLinkExpireDate = teamLinkExpireDate;
        this.teamName = teamName;
        this.teamLink = teamLink;
        this.teamIntro = teamIntro;
        this.teamImage = teamImage;
    }

    public Team toEntity() {
        return Team.builder()
                .teamId(teamId)
                .teamName(teamName)
                .teamLink(teamLink)
                .teamIntro(teamIntro)
                .teamImage(teamImage)
                .teamLinkExpireDate(teamLinkExpireDate)
                .build();
    }
}
