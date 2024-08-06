package com.example.saferoutine.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAuthDTO {

    private Long id;
    private String userHashId;
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private String profileImage;
    private String socialKey;

    @Builder
    public UserAuthDTO(Long id, String userHashId, String userName, String email, String password, String phoneNumber, String profileImage, String socialKey) {
        this.id = id;
        this.userHashId = userHashId;
        this.userName = userName;
        this.email = email;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.profileImage = profileImage;
        this.socialKey = socialKey;
    }
}
