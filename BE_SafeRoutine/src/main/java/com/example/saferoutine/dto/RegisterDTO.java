package com.example.saferoutine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.stereotype.Service;

@Getter
@Setter
@ToString
public class RegisterDTO {
    private String name;
    private String phoneNumber;
    private String email;
    private String password;
    private String profileImage;
}
