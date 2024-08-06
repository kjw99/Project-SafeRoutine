package com.example.saferoutine.dto;

import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
public class CheckListDTO {

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

