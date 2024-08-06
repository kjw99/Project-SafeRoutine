package com.example.saferoutine.db.entity;

import com.example.saferoutine.dto.CheckListTemplateDTO;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
@Document(collection = "checkLists")
@Getter
@Setter
@Builder
public class CheckList {

    @Id
    private String id;
    private int teamId;
    private String checkListName;
    private String resetTime;
    private String resetCycle;
    private List<CheckListRow> checkListRow;
    private List<CheckListCol> checkListCol;
    private String checkListType;
    private boolean checkListActive;
    private boolean checkListUse;
    private String checkListBackUpDate;
    private List<CommentInfo> commentInfo;

}

