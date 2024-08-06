package com.example.saferoutine.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

import java.util.Date;

@Entity
public class HelpDesk {
    @Id
    private Long postId;
    private String userHashId;
    private String title;
    private String content;
    private String userName;
    private Date writeDate;
    private String reply;
    enum PostType {
        notice,inquiry,faq
    };
    private PostType postType;
    public void setId(Long id) {
        this.postId = id;
    }

    public Long getId() {
        return postId;
    }
}
