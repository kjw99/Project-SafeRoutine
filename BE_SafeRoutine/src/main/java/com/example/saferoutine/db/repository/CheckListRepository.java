package com.example.saferoutine.db.repository;

import com.example.saferoutine.db.entity.CheckList;
import com.example.saferoutine.db.entity.CommentInfo;
import com.example.saferoutine.dto.CheckListDTO;
import com.example.saferoutine.dto.CheckListSubmitDTO;
import com.example.saferoutine.dto.CheckListTemplateDTO;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CheckListRepository extends MongoRepository<CheckList, String> {

    public List<CheckListTemplateDTO> findByTeamIdAndCheckListUse(int teamId, boolean checkListUse);

    public List<CheckListTemplateDTO> findByTeamIdAndCheckListActiveAndCheckListUse(int teamId, boolean checkListActive, boolean checkListUse);

    public List<CheckListTemplateDTO> findByTeamIdInAndCheckListUse(List<Integer> teamIds, boolean checkListUse);

    public List<CheckListTemplateDTO> findByTeamIdAndCheckListName(int teamId, String checkListName);

    @Aggregation({
            "{$match: { teamId: ?0, 'commentInfo.createDate': ?1 }}",
            "{$unwind: '$commentInfo' }",
            "{$match: { 'commentInfo.createDate': ?1 }}",
            "{$group: { _id: { userName: '$commentInfo.userName', userEmail: '$commentInfo.userEmail' }, count: { $sum: 1 } }}",
            "{$project: { _id: 0, name: '$_id.userName', email: '$_id.userEmail', count: 1 }}"
    })
    public List<CheckListSubmitDTO> aggregateCommentInfoByTeamIdAndCreateDate(int teamId, String createDate);

    @Aggregation(pipeline = {
            "{ $match: { teamId: ?0, 'commentInfo.createDate': ?1, 'commentInfo.userEmail': ?2 } }",
            "{ $project: { " +
                    "    teamId: 1, checkListName: 1, resetTime: 1, resetCycle: 1, checkListRow: 1, checkListCol: 1, checkListType: 1, checkListActive: 1, checkListUse: 1, checkListBackUpDate: 1, " +
                    "    commentInfo: { " +
                    "        $filter: { " +
                    "            input: '$commentInfo', " +
                    "            as: 'comment', " +
                    "            cond: { " +
                    "                $and: [ " +
                    "                    { $eq: ['$$comment.createDate', ?1] }, " +
                    "                    { $eq: ['$$comment.userEmail', ?2] } " +
                    "                ] " +
                    "            } " +
                    "        } " +
                    "    } " +
                    "}}"
    })
    public List<CheckListDTO> aggregateByTeamIdAndCommentInfoCreateDateAndCommentInfoUserEmail(int teamId, String createDate, String userEmail);


//    void insert(CheckListTemplateDTO checkListTemplateDTO);
//    void insert(CheckList checkList, String str);

    @Query(value = "{ 'teamId': ?0, 'checkListName': ?1, 'commentInfo.createDate': ?2, 'commentInfo.userEmail': ?3 }", fields = "{ 'commentInfo': { $elemMatch: { 'createDate': ?2, 'userEmail': ?3 } } }")
    List<CheckList> findCheckListByCriteria(int teamId, String checkListName, String createDate, String userEmail);
}
