package com.example.saferoutine.db.entity;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    @Column(unique = true)
    private String teamName;
    private String teamLink;//그룹 접속 주소
    private String teamIntro;//그룹 소개
    private String teamImage;
    private Date teamLinkExpireDate;//그룹 링크 초대 기한

    public Team() {
    }

    @Builder
    public Team(Long teamId, String teamName, String teamLink, String teamIntro, String teamImage, Date teamLinkExpireDate) {
        this.teamId = teamId;
        this.teamName = teamName;
        this.teamLink = teamLink;
        this.teamIntro = teamIntro;
        this.teamImage = teamImage;
        this.teamLinkExpireDate = teamLinkExpireDate;
    }
}
