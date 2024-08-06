package com.example.saferoutine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class PasswordFindRequestDTO {
    String name;
    String phoneNumber;
    String email;
}
