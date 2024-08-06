package com.example.saferoutine.api.service;

import com.example.saferoutine.db.entity.Team;
import com.example.saferoutine.db.entity.User;
import com.example.saferoutine.db.repository.TeamRepository;
import com.example.saferoutine.db.repository.UserRepository;
import com.example.saferoutine.dto.*;
import com.example.saferoutine.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TokenProvider tokenProvider;	// 추가
    @Autowired
    private TeamRepository teamRepository;
    public User getUserByEmail(String email){
        return userRepository.findByEmail(email);
    }

    public void register(RegisterDTO registerDTO) {

        User userExist = userRepository.findByEmail(registerDTO.getEmail());
        if (userExist != null){
            throw new RuntimeException("이미 존재하는 이메일입니다.");
        }
        User user = new User(registerDTO);
        userRepository.save(user);
    }

    public void logIn(EmailPwDTO emailPwDTO) {
        User user = userRepository.findByEmail(emailPwDTO.getEmail());
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        if(!user.getPassword().equals(emailPwDTO.getPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
    }
    public LoginResponseDTO logIn2(EmailPwDTO emailPwDTO){
        User user = userRepository.findByEmail(emailPwDTO.getEmail());
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        if(!user.getPassword().equals(emailPwDTO.getPassword())){
            throw new RuntimeException("비밀번호가 일치하지 않습니다.");
        }
        LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
        loginResponseDTO.setResult("SUCCESS");
        loginResponseDTO.setEmail(user.getEmail());
        loginResponseDTO.setToken(tokenProvider.createToken(String.format("%s:%s" ,user.getEmail(), user.getRole().toString())));
        loginResponseDTO.setUserType(user.getRole().toString());
        return loginResponseDTO;
    }
    public String findEmail(EmailFindDTO emailFindDTO) {
        User user = userRepository.findByphoneNumber(emailFindDTO.getPhoneNumber());
        if (user.getUserName().equals(emailFindDTO.getName())){
            return user.getEmail();
        }
        else{
            throw new RuntimeException("이름과 전화번호가 일치하지 않습니다.");
        }
    }
    public String findPassword(PasswordFindRequestDTO passwordFindRequestDTO){
        User user = userRepository.findByEmail(passwordFindRequestDTO.getEmail());
        if(user.getUserName().equals(passwordFindRequestDTO.getName())){
            if(user.getPhoneNumber().equals(passwordFindRequestDTO.getPhoneNumber())){
                return user.getPassword();
            }
            else{
                throw new RuntimeException("이름과 전화번호가 일치하지 않습니다.");
            }
        }
        else{
            throw new RuntimeException("이름과 이메일이 일치하지 않습니다.");
        }
    }

    public void modify(ModifyDTO modifyDTO) {
        User user = userRepository.findByEmail(modifyDTO.getEmail());
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        user.setUserName(modifyDTO.getName());
        user.setPhoneNumber(modifyDTO.getPhoneNumber());
        user.setProfileImage(modifyDTO.getProfileImage());
        userRepository.save(user);
    }

    public ModifyDTO Info(EmailPwDTO emailPwDTO) {
        User user = userRepository.findByEmail(emailPwDTO.getEmail());
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        ModifyDTO modifyDTO = new ModifyDTO();
        modifyDTO.setEmail(user.getEmail());
        modifyDTO.setName(user.getUserName());
        modifyDTO.setPhoneNumber(user.getPhoneNumber());
        modifyDTO.setProfileImage(user.getProfileImage());
        modifyDTO.setResult("SUCCESS");
        return modifyDTO;
    }

    public void withdraw(EmailPwDTO emailPwDTO) {
        User user = userRepository.findByEmail(emailPwDTO.getEmail());
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        userRepository.delete(user);
    }


    public List<Team> findMyTeam(String requestUserEmail) {
        User user = userRepository.findByEmail(requestUserEmail);
        if(user == null){
            throw new RuntimeException("존재하지 않는 이메일입니다.");
        }
        List<Team> teamList = teamRepository.findAllTeamByEmail(user.getEmail());
        return teamList;
    }
}
