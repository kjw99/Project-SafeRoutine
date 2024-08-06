package com.example.saferoutine.dto;

import com.example.saferoutine.db.entity.CheckList;
import com.example.saferoutine.db.entity.CheckListCol;
import com.example.saferoutine.db.entity.CheckListRow;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CheckListTemplateDTO {

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

    public CheckList toEntity() {
        return CheckList.builder()
                .id(id)
                .teamId(teamId)
                .checkListName(checkListName)
                .resetTime(resetTime)
                .resetCycle(resetCycle)
                .checkListRow(checkListRow)
                .checkListCol(checkListCol)
                .checkListType(checkListType)
                .checkListActive(checkListActive)
                .checkListUse(checkListUse)
                .checkListBackUpDate(checkListBackUpDate)
                .build();

    }

}
