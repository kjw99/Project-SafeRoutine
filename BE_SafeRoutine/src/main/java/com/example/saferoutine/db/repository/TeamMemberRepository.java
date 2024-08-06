package com.example.saferoutine.db.repository;

import com.example.saferoutine.db.entity.TeamMember;
import com.example.saferoutine.db.enums.PositionType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    @Query("SELECT MAX(t.teamPriority) FROM TeamMember t WHERE t.teamId = :teamId AND t.memberEmail = :memberEmail")
    Optional<Integer> findMaxTeamPriorityByTeamIdAndMemberEmail(@Param("teamId") Long teamId, @Param("memberEmail") String memberEmail);

    @Query("SELECT MAX(t.teamPriority) FROM TeamMember t WHERE t.memberEmail = :memberEmail")
    Optional<Integer> findMaxTeamPriorityByMemberEmail(@Param("memberEmail") String memberEmail);

    Optional<TeamMember> findByMemberEmailAndTeamIdAndMemberPosition(String memberEmail, Long teamId, PositionType memberPosition);
    Optional<TeamMember> findByMemberEmailAndTeamId(String memberEmail, Long teamId);

    void deleteByMemberEmailAndTeamId(String memberEmail, Long teamId);

    @Query("SELECT COUNT(t) FROM TeamMember t WHERE t.teamId = :teamId AND t.memberPosition = com.example.saferoutine.db.enums.PositionType.manager")
    long countByTeamIdAndMemberPositionManager(@Param("teamId") Long teamId);

    void deleteAllByTeamId(Long teamId);
    long countByTeamId(Long teamId);

    List<TeamMember> findAllByTeamId(Long teamId);
    List<TeamMember> findALlByMemberEmailAndMemberPosition(String memberEmail, PositionType memberPosition);


    Long countAllByTeamIdAndMemberEmail(Long teamId, String memberEmail);

    @Query("SELECT COUNT(t) FROM TeamMember t WHERE t.teamId = :teamId AND t.memberEmail = :memberEmail AND t.memberPosition = com.example.saferoutine.db.enums.PositionType.manager")
    Long countAllByTeamIdAndMemberEmailAndPositionManager(Long teamId, String memberEmail);


}
