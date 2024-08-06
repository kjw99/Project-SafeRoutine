package com.example.saferoutine.db.entity;

import com.example.saferoutine.dto.RegisterDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.net.SocketOption;
import java.util.Map;


@Entity
@Table(name = "user")
@Getter
@Setter
public class User{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Long id;

    private String userHashId;
    private String userName;
    private String email;
    private String password;
    private String phoneNumber;
    private String profileImage;
    private String socialKey;
    private UserRole role;


    /*
    * google Social Login
     */
    private String provider;
    private String providerId;

    public User(RegisterDTO registerDTO){
        this.userName = registerDTO.getName();
        this.email = registerDTO.getEmail();
        this.phoneNumber = registerDTO.getPhoneNumber();
        this.password = registerDTO.getPassword();
        this.role = UserRole.USER_NORMAL;
    }


    public User() {

    }

}