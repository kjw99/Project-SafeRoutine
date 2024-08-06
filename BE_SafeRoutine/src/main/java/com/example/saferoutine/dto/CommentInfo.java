package com.example.saferoutine.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CommentInfo {
    private String createDate;
    private String userEmail;
    private String userName;
    private List<Object> comments;

}
