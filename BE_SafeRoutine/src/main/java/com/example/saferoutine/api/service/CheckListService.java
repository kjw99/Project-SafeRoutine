package com.example.saferoutine.api.service;

import com.example.saferoutine.common.util.FileUploadUtil;
import com.example.saferoutine.db.entity.CheckList;
import com.example.saferoutine.db.entity.CommentInfo;
import com.example.saferoutine.db.repository.CheckListRepository;
import com.example.saferoutine.db.repository.TeamMemberRepository;
import com.example.saferoutine.dto.CheckListDTO;
import com.example.saferoutine.dto.CheckListSubmitDTO;
import com.example.saferoutine.dto.CheckListTemplateDTO;
import com.mongodb.client.model.UpdateOptions;
import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;


@Service
public class CheckListService {

    @Autowired
    private CheckListRepository checkListRepository;

    private MongoTemplate mongoTemplate;

    @Autowired
    private TeamMemberRepository teamMemberRepository;

    @Autowired
    public void setMongoTemplate(MongoTemplate mongoTemplate) {
        this.mongoTemplate = mongoTemplate;
    }

    // 팀 id로 체크리스트 목록 불러오기
    public List<CheckListTemplateDTO> checkListTemplateList(int teamId) {
        return checkListRepository.findByTeamIdAndCheckListUse(teamId, true);
    }

    // 팀원이 활성화 된 체크리스트 목록 조회
    public List<CheckListTemplateDTO> checkListActiveList(int teamId) {
        return checkListRepository.findByTeamIdAndCheckListActiveAndCheckListUse(teamId, true, true);
    }

    // 체크리스트 템플릿 불러오는 과정. 본인의 팀 또는 기본 제공 템플릿(102) 조회
    public List<CheckListTemplateDTO> checkListTeamSearch(int teamId) {
        List<Integer> teamIds = Arrays.asList(teamId, 102);
        return new ArrayList<>(checkListRepository.findByTeamIdInAndCheckListUse(teamIds, true));    }

    // 팀ID 와 체크리스트이름으로 상세 조회
    public List<CheckListTemplateDTO> checkListDetailSearch(Map<String, Object> map) {

        return new ArrayList<>
                (checkListRepository.findByTeamIdAndCheckListName((Integer) map.get("teamId"),
                        map.get("checkListName").toString()));
    }

    // 체크리스트 생성
    public void checkListAdd(CheckListTemplateDTO checkListTemplateDTO) {
        checkListRepository.insert(checkListTemplateDTO.toEntity());
    }

    // 팀id와 날짜로 모든 인원의 해당 날에 체크리스트 제출 횟수 구하기
    public List<CheckListSubmitDTO> checkListSubmitCount(Map<String, Object> map) {

        return checkListRepository.aggregateCommentInfoByTeamIdAndCreateDate((Integer) map.get("teamId"),
                map.get("createDate").toString());
    }

    // 팀id와 날짜, 유저 이메일로 해당 날에 제출한 유저의 체크리스트들 상세 조회
    public List<CheckListDTO> checkListSubmitDetail(Map<String, Object> map) {
        return checkListRepository.aggregateByTeamIdAndCommentInfoCreateDateAndCommentInfoUserEmail((Integer) map.get("teamId"),
                map.get("createDate").toString(), map.get("userEmail").toString());
    }


    // _id로 기존 템플릿 확인. 체크리스트 제출 이력(답변)이 없으면 그대로 덮어쓰기로 수정.
    // 체크리스트 제출 이력이 존재하면 템플릿 이름 앞에 [DEL][날짜] 를 추가하고 체크리스트 사용중지 처리하고 새로 수정할 체크리스트 생성.
    public String checkListUpdateSave(CheckList checkList) {
        Query query = new Query(Criteria.where("_id").is(checkList.getId()));
        CheckList checkListUpdate = mongoTemplate.findOne(query, CheckList.class); // DB에 저장되어 있는 변경 전 데이터

        if (checkListUpdate != null) {
            if (checkListUpdate.getCommentInfo() == null) {
                mongoTemplate.save(checkList);
                return "수정 성공";
            }
            else {
                copyCheckList(checkListUpdate);

                checkList.setId(null);
                checkList.setCommentInfo(null);
                checkListRepository.insert(checkList);

                return "수정 성공";
            }

        }
        else {
            return "데이터가 없습니다";
        }

    }

    // 체크리스트 id 값으로 해당 체크리스트에 답변이 존재하면 사용중지 처리. 없으면 삭제
    public String checkListDelete(Map<String, Object> map) {
        Query query = new Query(Criteria.where("_id").is(map.get("id")));
        CheckList checkList = mongoTemplate.findOne(query, CheckList.class);
        if (checkList != null) {
            if (checkList.getCommentInfo() == null) {
                mongoTemplate.remove(checkList);
                return "삭제 성공";
            }
            else {
                copyCheckList(checkList);
                return "삭제 성공";
            }
        }
        else {
            return "삭제 실패";
        }

    }

    // checkListActive 값 변경. 체크리스트 활성화 여부 변경
    public String checkListActiveChange(Map<String, Object> map) {

        Query query = new Query(Criteria.where("_id").is(map.get("id")));
        CheckList checkList = mongoTemplate.findOne(query, CheckList.class);
        if (checkList != null) {
            Update update = new Update();
            update.set("checkListActive", !checkList.isCheckListActive());
            mongoTemplate.updateFirst(query, update, "checkLists");
            return "성공";
        }
        else {
            return "실패";
        }

    }

    // teamId, checkListName 사용해서 체크리스트 찾고 해당 체크리스트에 답변 추가
    // createDate와 userEmail이 일치하는 답변이 이미 존재하면 해당 답변을 덮어쓴다.
    public String checkListCommentAdd(CheckList checkList) {

        CommentInfo commentInfo = checkList.getCommentInfo().get(0);

        // 이미 오늘 등록한 답변이 있는지 확인하는 query 작성
        Query query = new Query();
        query.addCriteria(Criteria.where("teamId").is(checkList.getTeamId())
                .and("checkListName").is(checkList.getCheckListName())
                .and("commentInfo.createDate").is(commentInfo.getCreateDate())
                .and("commentInfo.userEmail").is(commentInfo.getUserEmail()));

        // 데이터가 존재하면 이미 답변 제출을 했다는 뜻.
        if (mongoTemplate.exists(query, "checkLists")) {
            Document filter = new Document("teamId", checkList.getTeamId())
                    .append("checkListName", checkList.getCheckListName())
                    .append("commentInfo.userEmail", commentInfo.getUserEmail())
                    .append("commentInfo.createDate", commentInfo.getCreateDate());

            Document update = new Document("$set", new Document("commentInfo.$[element].comments", commentInfo.getComments()));

            Document arrayFilters = new Document("element.userEmail", commentInfo.getUserEmail())
                    .append("element.createDate", commentInfo.getCreateDate());

            // 업데이트 적용할 대상 필터 처리해서 업데이트.
            mongoTemplate.getCollection("checkLists").updateMany(filter, update, new UpdateOptions().arrayFilters(List.of(arrayFilters)));

            return "답변 수정 성공";
        }
        else {
            // 답변 추가.
            mongoTemplate.updateFirst(
                    Query.query(Criteria.where("teamId").is(checkList.getTeamId())
                            .and("checkListName").is(checkList.getCheckListName())),
                    new Update().push("commentInfo", checkList.getCommentInfo().get(0)),
                    "checkLists"
            );
            return "답변 추가 성공";
        }

    }

    // 체크리스트 수정, 삭제 과정에서 체크리스트 사용중지 처리하는 메서드
    public void copyCheckList(CheckList checkList) {
        checkList.setCheckListName(dateTimeFormat()
                + checkList.getCheckListName());
        checkList.setCheckListActive(false);
        checkList.setCheckListUse(false);
        mongoTemplate.save(checkList);
    }

    // [DEL] + 현재 날짜 문자열 만들어 주는 메서드
    public String dateTimeFormat() {
        LocalDate dateNow = LocalDate.now();

        LocalTime timeNow = LocalTime.now();
        DateTimeFormatter formatterTime = DateTimeFormatter.ofPattern("HH시 mm분 ss초");
        String formatedTimeNow = timeNow.format(formatterTime);

        return "[DEL][" + dateNow + ", " + formatedTimeNow + "]";
    }

    public List<CommentInfo> checkListCommentView(CheckList checkList) {
        List<CheckList> checkLists = checkListRepository.findCheckListByCriteria(
                checkList.getTeamId(),
                checkList.getCheckListName(),
                checkList.getCommentInfo().get(0).getCreateDate(),
                checkList.getCommentInfo().get(0).getUserEmail()
        );
        if (!checkLists.isEmpty()) return checkLists.get(0).getCommentInfo();
        return new ArrayList<>();
    }

    // UCL-000 에서 토큰에 있는 이메일과 teamId를 사용해서 해당 유저가 팀에 소속된 유저인지 확인
    public boolean userTokenCheck(Long teamId, String email) {
        Long num = teamMemberRepository.countAllByTeamIdAndMemberEmail(teamId, email);
        if (num > 0) {
            return true;
        }
        return false;
    }

    public boolean managerTokenCheck(Long teamId, String email) {
        Long num = teamMemberRepository.countAllByTeamIdAndMemberEmailAndPositionManager(teamId, email);
        if (num > 0) {
            return true;
        }
        return false;
    }


}
