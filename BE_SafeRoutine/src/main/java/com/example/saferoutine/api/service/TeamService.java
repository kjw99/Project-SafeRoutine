package com.example.saferoutine.api.service;

import com.example.saferoutine.db.entity.Team;
import com.example.saferoutine.db.entity.TeamMember;
import com.example.saferoutine.db.entity.User;
import com.example.saferoutine.db.enums.PositionType;
import com.example.saferoutine.db.repository.TeamMemberRepository;
import com.example.saferoutine.db.repository.TeamRepository;
import com.example.saferoutine.db.repository.UserRepository;
import com.example.saferoutine.dto.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class TeamService {

    private final TeamRepository teamRepository;
    private final TeamMemberRepository teamMemberRepository;
    private final UserRepository userRepository;

    @Autowired
    public TeamService(TeamRepository teamRepository, TeamMemberRepository teamMemberRepository, UserRepository userRepository) {
        this.teamRepository = teamRepository;
        this.teamMemberRepository = teamMemberRepository;
        this.userRepository = userRepository;
    }
    public void save2(String creatorEmail, TeamCreateRequestDTO teamCreateRequestDTO) throws IOException {
//        1. 요청 사용자 정보 조회
        User requestUser = userRepository.findByEmail(creatorEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 팀 정보 엔티티화 및 저장
        Team createTeam = teamCreateRequestDTO.getTeamInfo().toEntity();
        teamRepository.save(createTeam);
//        3. 사용자의 팀 정렬 순서 최대값 추출하여 +1 값 저장
        Optional<Integer> maxTeamPriority = teamMemberRepository.findMaxTeamPriorityByMemberEmail(requestUser.getEmail());
        int maxPriority = maxTeamPriority.map(value -> value + 1).orElse(1);
//        4. 요청 사용자 정보를 팀 맴버 엔티티화
        TeamUserDTO teamCreateUserDTO = TeamUserDTO.builder()
                .teamId(createTeam.getTeamId())
                .memberEmail(requestUser.getEmail())
                .memberName(requestUser.getUserName())
                .memberPosition(PositionType.manager)
                .teamPriority(maxPriority)
                .build();
//            5. 팀 맴버 저장
        teamMemberRepository.save(teamCreateUserDTO.toEntity());
    }
    public void extendExpireDate2(String manageEmail, TeamExpireRequestDTO expireRequestDTO){
//        0. DTO 분할
        TeamExpireDTO expireDTO = expireRequestDTO.getTeamInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 이 유저가 해당 팀의 관리자 직위인가 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), expireDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()) {
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. teamId 를 통한 팀 정보 획득
        Optional<Team> teamOptional = teamRepository.findById(expireDTO.getTeamId());
        if (!teamOptional.isPresent()){
            throw new RuntimeException("TEAM_SEARCH_FAILED");
        }
//        4. 팀 정보 갱신 빌드
        Team team = teamOptional.get();
        TeamExpireDTO updatedExpireDTO = TeamExpireDTO.builder()
                .teamId(team.getTeamId()) // 기존 값 유지
                .teamName(team.getTeamName()) // 기존 값 유지
                .teamLink(team.getTeamLink()) // 기존 값 유지
                .teamIntro(team.getTeamIntro()) // 기존 값 유지
                .teamImage(team.getTeamImage()) // 기존 값 유지
                .teamLinkExpireDate(expireDTO.getTeamLinkExpireDate()) //값 갱신
                .build();
//        5. 팀 정보 엔티티화 저장
        teamRepository.save(updatedExpireDTO.toEntity());

    }
    public void updateTeamInfo2(String manageEmail, TeamExpireRequestDTO updateRequestDTO){
//        0.DTO 분할
        TeamUpdateDTO updateDTO = updateRequestDTO.getTeamUpdateInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 이 유저가 해당 팀의 관리자 직위인가 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), updateDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()) {
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. teamId 를 통한 팀 정보 획득
        Optional<Team> teamOptional = teamRepository.findById(updateDTO.getTeamId());
        if (!teamOptional.isPresent()){
            throw new RuntimeException("TEAM_SEARCH_FAILED");
        }
//        4. 팀 갱신 정보 빌드
        Team team = teamOptional.get();
//        5. 팀 이미지 갱신 검증
        String imagePath = updateDTO.getTeamImage();
        if(updateDTO.getTeamImage()==null||updateDTO.getTeamImage().isBlank()){
            imagePath = team.getTeamImage();
        }
//        6. 팀 정보 갱신 빌드
            TeamUpdateDTO teamUpdateDTO = TeamUpdateDTO.builder()
                    .teamId(team.getTeamId()) // 기존 값 유지
                    .teamName(team.getTeamName()) // 기존 값 유지
                    .teamLink(team.getTeamLink()) // 기존 값 유지
                    .teamIntro(updateDTO.getTeamIntro()) // 값 갱신
                    .teamImage(imagePath) // 값 갱신
                    .teamLinkExpireDate(team.getTeamLinkExpireDate()) // 기존 값 유지
                    .build();
//        7. 팀 정보 엔티티화 저장
            teamRepository.save(teamUpdateDTO.toEntity());
    }
    public void withdrawTeam2(String userEmail, TeamWithdrawRequestDTO withdrawRequestDTO){
//        0. DTO 분리
        TeamUserDTO userDTO = withdrawRequestDTO.getTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(userEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 소속 팀원 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamId(requestUser.getEmail(), userDTO.getTeamId());
        if(!teamMemberOptional.isPresent()) {
            throw new RuntimeException("TEAM_MEMBER_AUTHENTICATION_FAILED");
        }
//        3. 직위가 관리자일 경우 단일 관리자인지 여부에 따른 검증
        if (teamMemberOptional.get().getMemberPosition() == PositionType.manager) { // 관리자 직위라면
            Long mCount = teamMemberRepository.countByTeamIdAndMemberPositionManager(userDTO.getTeamId());
            if (mCount > 1) { // 팀 내 관리자 직위가 둘 이상이라면
//                4. 팀 맴버 테이블에서 삭제
                teamMemberRepository.deleteByMemberEmailAndTeamId(requestUser.getEmail(), userDTO.getTeamId());
            } else { // 단일 관리자라면
                throw new RuntimeException("YOU_ARE_THE_LAST_MANAGER");
            }
        } else if (teamMemberOptional.get().getMemberPosition() == PositionType.normal) { // 일반 직위라면
//            4. 팀 맴버 테이블에서 삭제
            teamMemberRepository.deleteByMemberEmailAndTeamId(requestUser.getEmail(), userDTO.getTeamId());
        }
    }
    public void destroyTeam2(String manageEmail, TeamWithdrawRequestDTO destroyRequestDTO) {
//        0. DTO 분리
        TeamUserDTO userDTO = destroyRequestDTO.getTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 이 유저가 해당 팀의 관리자 직위인가 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), userDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()) {
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. 팀 소속 맴버 전부 삭제
        teamMemberRepository.deleteAllByTeamId(userDTO.getTeamId());
//        4. 팀 소속 맴버 수 0이라면 팀 삭제
        Long mCount = teamMemberRepository.countByTeamId(userDTO.getTeamId());
        if(mCount == 0){
            teamRepository.deleteById(userDTO.getTeamId());
        } else {
            throw new RuntimeException("TEAM_MEMBER_STILL_EXIST");
        }
    }
    public void joinTeam2(String teamLink, String userEmail) {
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(userEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 팀링크를 통한 팀 정보 획득
        Optional<Team> teamOptional = teamRepository.findByTeamLink(teamLink);
        if(!teamOptional.isPresent()){
            throw new RuntimeException("UNDEFINED_TEAM_LINK");
        }
//        3. 팀 가입기간 검증
        Date expireDate = teamOptional.get().getTeamLinkExpireDate();
        Date now = new Date();
        if(expireDate.toInstant().isBefore(Instant.now())){
            throw new RuntimeException("TEAM_LINK_EXPIRED");
        }
//        4. 팀 가입 여부 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamId(requestUser.getEmail(), teamOptional.get().getTeamId());
        if(teamMemberOptional.isPresent()){
            throw new RuntimeException("DUPLICATED_MEMBER");
        }
//        5. 사용자의 팀 정렬 순서 최대값 추출하여 +1 값 저장
        Optional<Integer> maxTeamPriority = teamMemberRepository.findMaxTeamPriorityByMemberEmail(requestUser.getEmail());
        int maxPriority = maxTeamPriority.map(value -> value + 1).orElse(1);
//        6. 팀 맴버 테이블에 엔티티화하여 저장
        TeamUserDTO joinUserDTO = TeamUserDTO.builder()
                .teamId(teamOptional.get().getTeamId())
                .memberEmail(requestUser.getEmail())
                .memberName(requestUser.getUserName())
                .memberPosition(PositionType.normal)
                .teamPriority(maxPriority)
                .build();
        teamMemberRepository.save(joinUserDTO.toEntity());
    }
    public List<TeamMember> getTeamMemberList2(String manageEmail, TeamInfoRequestDTO teamInfoRequestDTO) {
//        0. DTO 분리
        TeamUserDTO requestMemberAuthDTO = teamInfoRequestDTO.getTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 소속 팀 직위가 관리자인지 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), requestMemberAuthDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()){
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. 팀원 리스트 반환
        return teamMemberRepository.findAllByTeamId(requestMemberAuthDTO.getTeamId());
    }
    public void withdrawTeamMember2(String manageEmail, TeamInfoRequestDTO teamInfoRequestDTO) {
//        0. DTO 분리
        TeamUserDTO requestMemberAuthDTO = teamInfoRequestDTO.getTeamMemberInfo();
        TeamUserDTO withdrawMemberDTO = teamInfoRequestDTO.getWithdrawTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 소속 팀 직위가 관리자인지 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), requestMemberAuthDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()){
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. 팀 맴버 여부 조회
        Optional<TeamMember> targetOptional = teamMemberRepository.findByMemberEmailAndTeamId(withdrawMemberDTO.getMemberEmail(), withdrawMemberDTO.getTeamId());
        if(!targetOptional.isPresent()){
            throw new RuntimeException("TARGET_NOT_EXIST");
        }
//        4. 팀 맴버 테이블에서 삭제 처리
        teamMemberRepository.deleteByMemberEmailAndTeamId(withdrawMemberDTO.getMemberEmail(), withdrawMemberDTO.getTeamId());
    }
    public void updateTeamMemberPosition2(String manageEmail, TeamInfoRequestDTO teamInfoRequestDTO) {
        //        0. DTO 분리
        TeamUserDTO requestMemberAuthDTO = teamInfoRequestDTO.getTeamMemberInfo();
        TeamUserDTO updateMemberDTO = teamInfoRequestDTO.getUpdateTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(manageEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 소속 팀 직위가 관리자인지 검증
        Optional<TeamMember> teamMemberOptional = teamMemberRepository.findByMemberEmailAndTeamIdAndMemberPosition(requestUser.getEmail(), requestMemberAuthDTO.getTeamId(), PositionType.manager);
        if(!teamMemberOptional.isPresent()){
            throw new RuntimeException("TEAM_MEMBER_POSITION_AUTHENTICATION_FAILED");
        }
//        3. 팀 맴버 여부 조회
        Optional<TeamMember> targetOptional = teamMemberRepository.findByMemberEmailAndTeamId(updateMemberDTO.getMemberEmail(), updateMemberDTO.getTeamId());
        if(!targetOptional.isPresent()){
            throw new RuntimeException("TARGET_NOT_EXIST");
        }
//        4. 팀 맴버 정보 갱신 빌드
        TeamMember updateTeamMember = targetOptional.get();
        TeamUserDTO updateTeamUserDTO = TeamUserDTO.builder()
                .id(updateTeamMember.getId())
                .teamId(updateTeamMember.getTeamId())
                .userHashId(updateTeamMember.getUserHashId())
                .memberEmail(updateTeamMember.getMemberEmail())
                .memberName(updateTeamMember.getMemberName())
                .memberPosition(updateMemberDTO.getMemberPosition())
                .teamPriority(updateTeamMember.getTeamPriority())
                .build();
//        5. 팀 맴버 정보 수정
        teamMemberRepository.save(updateTeamUserDTO.toEntity());
    }

    public List<Team> manageList(TeamInfoRequestDTO teamInfoRequestDTO) {
//        DTO 분리
        UserAuthDTO userDTO = teamInfoRequestDTO.getUserInfo();
//        사용자 인가
        User requestUser = userRepository.findByEmail(userDTO.getEmail());
//        if(!requestUser.getPassword().equals(userDTO.getPassword())){
//            throw new RuntimeException("USER_AUTH_FAILED");
//        }
        List<Team> myManageList = teamRepository.findTeamsByManagerEmail(requestUser.getEmail());
        return myManageList;
    }
    public PositionType yourPosition(String userEmail, TeamInfoRequestDTO teamInfoRequestDTO) {
//        0. DTO 분리
        TeamUserDTO requestMemberDTO = teamInfoRequestDTO.getTeamMemberInfo();
//        1. 유저 존재 검증
        User requestUser = userRepository.findByEmail(userEmail);
        if(requestUser == null){
            throw new RuntimeException("UNDEFINED_ACCOUNT");
        }
//        2. 소속 팀 직위 조회
        Optional<TeamMember> findMember = teamMemberRepository.findByMemberEmailAndTeamId(requestUser.getEmail(), requestMemberDTO.getTeamId());
        if(!findMember.isPresent()){
            throw new RuntimeException("TEAM_MEMBER_AUTHENTICATION_FAILED");
        }
        TeamMember member = findMember.get();
        return member.getMemberPosition();
    }
}