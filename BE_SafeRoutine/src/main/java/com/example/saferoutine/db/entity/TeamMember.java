package com.example.saferoutine.db.entity;


import com.example.saferoutine.db.enums.PositionType;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long teamId;
    private String userHashId;
    private String memberEmail;
    private String memberName;
    @Enumerated(EnumType.STRING)
    private PositionType memberPosition;// 관리자인지 일반 유저인지
    private int teamPriority;// 맴버별 그룹 순서

    public TeamMember() {}

    @Builder
    public TeamMember(Long id, Long teamId, String userHashId, String memberEmail, String memberName, PositionType memberPosition, int teamPriority) {
        this.id = id;
        this.teamId = teamId;
        this.userHashId = userHashId;
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.memberPosition = memberPosition;
        this.teamPriority = teamPriority;
    }
}
