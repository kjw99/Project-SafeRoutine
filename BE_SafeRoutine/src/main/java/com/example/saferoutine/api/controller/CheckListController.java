package com.example.saferoutine.api.controller;

import com.example.saferoutine.api.service.CheckListService;
import com.example.saferoutine.db.entity.CheckList;
import com.example.saferoutine.db.entity.CommentInfo;
import com.example.saferoutine.dto.CheckListDTO;
import com.example.saferoutine.dto.CheckListSubmitDTO;
import com.example.saferoutine.dto.CheckListTemplateDTO;
import com.example.saferoutine.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/team")
public class CheckListController {

    private final CheckListService checkListService;

    @Autowired
    private TokenProvider tokenProvider;

    public CheckListController(CheckListService checkListService) {
        this.checkListService = checkListService;
    }

    // MANA-100 팀id 와 createDate(답변 생성일)로 팀 인원들이 해당 날짜에 제출한 체크리스트 개수를 반환
    @PostMapping("/manager/check/submitList")
    public ResponseEntity<?> checkListSubmitCount(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
//        System.out.println("mana-100 요청함");
//        System.out.println(map.get("teamId"));
//        System.out.println(map.get("createDate"));
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            int teamId = (int) map.get("teamId");
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            // 해당 팀의 관리자가 맞는가 체크
            if (!checkListService.managerTokenCheck((long) teamId, email)) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListSubmitCount(map));
    }

    // MANA-101 팀id, 답변 작성일, 작성자 이메일을 사용해서 작성자가 답변한 체크리스트 정보와 해당 답변들만 조회
    @PostMapping("/manager/check/submitDetail")
    public ResponseEntity<?> checkListSubmitDetail(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            int teamId = (int) map.get("teamId");
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListSubmitDetail(map));
    }

    // MANA-200 teamId 사용해서 해당 팀의 체크리스트 또는 기본 체크리스트 템플릿 조회
    @PostMapping("/manager/check/choice")
    public ResponseEntity<?> checkListTeamSearch(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
        int teamId = (int) map.get("teamId");
//        System.out.println(teamId + " mana-200 신호 들어옴");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListTeamSearch(teamId));
    }

    // MANA-201 체크리스트 템플릿 생성.
    @PostMapping("/manager/check/add")
    public ResponseEntity<?> checkListAdd(@RequestHeader("Authorization") String token, @RequestBody CheckListTemplateDTO checkListTemplateDTO) {
//        System.out.println("mana-201 신호 들어옴");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) checkListTemplateDTO.getTeamId(), email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }

        checkListService.checkListAdd(checkListTemplateDTO);

        return ResponseEntity.ok("생성 완료");
    }

    // MANA-300 팀 + 체크리스트 이름으로 체크리스트 1개 조회
    @PostMapping("/manager/check/updateView")
    public ResponseEntity<?> checkListDetailSearch(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
//        System.out.println("mana-300 요청 들어옴");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            int teamId = (int) map.get("teamId");

            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListDetailSearch(map));
    }

    // MANA-301 체크리스트 템플릿 수정.
    @PostMapping("/manager/check/update")
    public ResponseEntity<?> checkListUpdate(@RequestHeader("Authorization") String token, @RequestBody CheckList checkList) {
//        System.out.println("mana-301 요청 들어옴");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) checkList.getTeamId(), email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListUpdateSave(checkList));
    }

    // MANA-400 체크리스트 템플릿 삭제. 체크리스트 id 사용.
    @PostMapping("/manager/check/delete")
    public ResponseEntity<String> checkListDelete(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
//        System.out.println("mana-400 요청 들어옴");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            int teamId = (int) map.get("teamId");
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListDelete(map));
    }

    // MANA-500 그룹에서 생성한 체크리스트 목록 조회
    @PostMapping("/manager/check/list")
    public ResponseEntity<?> checkListTemplateList(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
        int teamId = (int) map.get("teamId");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListTemplateList(teamId));
    }

    // MANA-501 체크리스트의 활성화 여부 변경
    @PostMapping("/manager/check/list/active")
    public ResponseEntity<String> checkListActiveChange(@RequestHeader("Authorization") String token, @RequestBody Map<String, Object> map) {
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            int teamId = (int) map.get("teamId");
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.managerTokenCheck((long) teamId, email)) {
//                System.out.println("해당 팀의 관리자가 맞습니다.");
            }
            else {
//                System.out.println("해당 팀의 관리자가 아닙니다.");
//                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("ExceptionFAILED", HttpStatus.OK);
        }
        return ResponseEntity.ok(checkListService.checkListActiveChange(map));
    }

    // UCL-000 유저가 가입한 팀의 활성화 된 체크리스트 목록 조회
    @PostMapping("/user/check/list")
    public ResponseEntity<?> checkListActiveList(@RequestHeader("Authorization") String token, @RequestBody int teamId) {
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (checkListService.userTokenCheck((long) teamId, email)) {
//                System.out.println("팀에 속한 사용자입니다.");
            }
            else {
//                System.out.println("팀에 속하지 않은 사용자 입니다.");
            }
            return new ResponseEntity<List<CheckListTemplateDTO>>(checkListService.checkListActiveList(teamId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }

    }

    // UCL-103 체크리스트 답변 제출
    @PostMapping("/user/check/list/add")
    public ResponseEntity<?> checkListCommentAdd(@RequestHeader("Authorization") String token, @RequestBody CheckList checkList) {
//        System.out.println("UCL-103 요청함");
        try {
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            if (email == null) {
                return new ResponseEntity<String>("FAILED", HttpStatus.OK);
            }
            if (email.equals(checkList.getCommentInfo().get(0).getUserEmail())) {
//                System.out.println("동일한 사용자 입니다");
            }
            else {
//                System.out.println("토큰 값과 작성 이메일이 서로 다른 사용자 입니다.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok(checkListService.checkListCommentAdd(checkList));
    }

    @PostMapping("/user/check/view")
    public ResponseEntity<List<CommentInfo>> checkListCommentView(@RequestBody CheckList checkList) {
        return ResponseEntity.ok(checkListService.checkListCommentView(checkList));
    }

}
