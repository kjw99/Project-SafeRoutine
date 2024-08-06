package com.example.saferoutine.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class LoginResponseDTO
{
    private String result;
    private String email;
    private String userType;
    private String sotialType;
    private String token;
}