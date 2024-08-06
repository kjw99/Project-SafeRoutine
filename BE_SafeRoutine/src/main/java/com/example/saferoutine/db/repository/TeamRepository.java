package com.example.saferoutine.db.repository;

import com.example.saferoutine.db.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    Optional<Team> findByTeamLink(String teamLink);

    boolean findByTeamName(String teamName);

    @Query("SELECT DISTINCT t FROM Team t " +
            "JOIN TeamMember tm ON t.teamId = tm.teamId " +
            "WHERE tm.memberEmail = :email AND tm.memberPosition = 'manager'")
    List<Team> findTeamsByManagerEmail(@Param("email") String email);

    @Query("SELECT DISTINCT t FROM Team t " +
            "JOIN TeamMember tm ON t.teamId = tm.teamId " +
            "WHERE tm.memberEmail = :email")
    List<Team> findAllTeamByEmail(@Param("email") String email);


}
