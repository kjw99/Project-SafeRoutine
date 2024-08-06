package com.example.saferoutine.api.controller;

import com.example.saferoutine.api.service.TeamService;
import com.example.saferoutine.db.entity.Team;
import com.example.saferoutine.db.entity.TeamMember;
import com.example.saferoutine.db.enums.PositionType;
import com.example.saferoutine.dto.*;
import com.example.saferoutine.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@Controller
@RequestMapping("/api/main")
public class TeamController {

    private final TeamService teamService;
    @Autowired//이
    private final TokenProvider tokenProvider;

    @Autowired
    public TeamController(TeamService teamService, TokenProvider tokenProvider) {
        this.teamService = teamService;
        this.tokenProvider = tokenProvider;
    }
//    MAIN-005 팀생성 Auth By JWT
    @PostMapping("/create-team")
    public ResponseEntity<String> save(@RequestHeader("Authorization") String token,
                                        @RequestBody TeamCreateRequestDTO teamCreateRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String creatorUserEmail = parts[0];
            if(creatorUserEmail != null && !creatorUserEmail.isBlank()){
                teamService.save2(creatorUserEmail, teamCreateRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-007 팀 가입기간 갱신 Auth By JWT
    @PostMapping("/recruit-team")
    public ResponseEntity<String> extend(@RequestHeader("Authorization") String token,
                                         @RequestBody TeamExpireRequestDTO expireRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String manageUserEmail = parts[0];
            if(manageUserEmail != null && !manageUserEmail.isBlank()){
                teamService.extendExpireDate2(manageUserEmail, expireRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-006 팀 정보 갱신 Auth By JWT
    @PostMapping("/update-team")
    public ResponseEntity<String> update(@RequestHeader("Authorization") String token,
                                         @RequestBody TeamExpireRequestDTO updateRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String manageUserEmail = parts[0];
            if(manageUserEmail != null && !manageUserEmail.isBlank()){
                teamService.updateTeamInfo2(manageUserEmail, updateRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-003 팀 탈퇴 Auth By JWT
    @PostMapping("/withdraw-team")
    public ResponseEntity<String> withdraw(@RequestHeader("Authorization") String token,
                                            @RequestBody TeamWithdrawRequestDTO withdrawRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                teamService.withdrawTeam2(requestUserEmail, withdrawRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-004 팀 해체 Auth By JWT
    @PostMapping("/destroy-team")
    public ResponseEntity<String> destroy(@RequestHeader("Authorization") String token,
                                           @RequestBody TeamWithdrawRequestDTO destroyRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                teamService.destroyTeam2(requestUserEmail, destroyRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-008 팀 가입요청 Auth By JWT
    @PostMapping("/join-team/{teamLink}")
    public ResponseEntity<String> join(@PathVariable String teamLink,
                                        @RequestHeader("Authorization") String token){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                teamService.joinTeam2(teamLink, requestUserEmail);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-005 팀 관리자의 팀원 조회 Auth By JWT
    @PostMapping("/manage-team")
    public ResponseEntity<?> memberList(@RequestHeader("Authorization") String token,
                                        @RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                List<TeamMember> teamList = teamService.getTeamMemberList2(requestUserEmail, teamInfoRequestDTO);
                return new ResponseEntity<List<TeamMember>>(teamList, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-102 팀 관리자의 팀 맴버 추방 Auth By JWT
    @PostMapping("/manage-team/withdraw")
    public ResponseEntity<String> memberWithdraw(@RequestHeader("Authorization") String token,
                                                  @RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                teamService.withdrawTeamMember2(requestUserEmail, teamInfoRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-101 팀 관리자의 팀 맴버 직위 수정 Auth By JWT
    @PostMapping("/manage-team/update")
    public ResponseEntity<String> memberPositionUpdate(@RequestHeader("Authorization") String token,
                                                       @RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                teamService.updateTeamMemberPosition2(requestUserEmail, teamInfoRequestDTO);
                return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-103 자신이 관리자인 팀의 목록 조회
    @PostMapping("/manage-team/management")
    public ResponseEntity<?> myManageList(@RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try {
            List<Team> myList = teamService.manageList(teamInfoRequestDTO);
            return new ResponseEntity<List<Team>>(myList, HttpStatus.OK);
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
//    MAIN-200 팀 페이지 접속 시 사용자의 팀 내 직위 반환
    @PostMapping("/position-auth")
    public ResponseEntity<?> positionAuth(@RequestHeader("Authorization") String token, @RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":");
            String requestUserEmail = parts[0];
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                PositionType yourPosition = teamService.yourPosition(requestUserEmail, teamInfoRequestDTO);
                return new ResponseEntity<PositionType>(yourPosition, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }




//    MAIN-103 자신이 관리자인 팀의 목록 조회 Auth By JWT
    @PostMapping("/manage-team/management2")
    public ResponseEntity<?> myManageList2(@RequestHeader("Authorization") String token,
                                           @RequestBody TeamInfoRequestDTO teamInfoRequestDTO){
        try {
            String requestUserEmail = tokenProvider.validateTokenAndGetSubject(token);
            if(requestUserEmail != null && !requestUserEmail.isBlank()){
                List<Team> myList = teamService.manageList(teamInfoRequestDTO);
                return new ResponseEntity<List<Team>>(myList, HttpStatus.OK);
            } else {
                return new ResponseEntity<String>("AUTH_FAILED", HttpStatus.OK);
            }
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }

}