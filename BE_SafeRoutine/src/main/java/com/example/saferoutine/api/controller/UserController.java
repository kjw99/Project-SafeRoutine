package com.example.saferoutine.api.controller;

import com.example.saferoutine.api.service.UserService;
import com.example.saferoutine.common.util.StringUtil;
import com.example.saferoutine.db.entity.Team;
import com.example.saferoutine.db.entity.User;
import com.example.saferoutine.dto.*;
import com.example.saferoutine.security.TokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private TokenProvider tokenProvider;
    @Autowired
    private StringUtil stringUtil;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterDTO registerDTO){
        try{
            userService.register(registerDTO);
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
    @PostMapping("/login")
    public ResponseEntity<String> logIn(@RequestBody EmailPwDTO emailPwDTO){
        try{
            //System.out.println(emailPwDTO);
            userService.logIn(emailPwDTO);
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }

    @PostMapping("/login2")
    public ResponseEntity<LoginResponseDTO> logIn2 (@RequestBody EmailPwDTO emailPwDTO){
        try {
            LoginResponseDTO loginResponseDTO = userService.logIn2(emailPwDTO);
            return new ResponseEntity<LoginResponseDTO>(loginResponseDTO, HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            LoginResponseDTO loginResponseDTO = new LoginResponseDTO();
            loginResponseDTO.setResult("FAILED");
            return new ResponseEntity<LoginResponseDTO>(loginResponseDTO, HttpStatus.OK);
        }
    }

    @PostMapping("/find-email")
    public ResponseEntity<EmailFindResultDTO> findEmail(@RequestBody EmailFindDTO emailFindDTO){
        try{
            String email = userService.findEmail(emailFindDTO);
            EmailFindResultDTO emailFindResultDTO = new EmailFindResultDTO();
            emailFindResultDTO.setResult("SUCCESS");
            emailFindResultDTO.setValue(email);
            return new ResponseEntity<EmailFindResultDTO>(emailFindResultDTO, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            EmailFindResultDTO emailFindResultDTO = new EmailFindResultDTO();
            emailFindResultDTO.setResult("FAILED");
            emailFindResultDTO.setValue("");
            return new ResponseEntity<EmailFindResultDTO>(emailFindResultDTO, HttpStatus.OK);
        }
    }

    @PostMapping("/find-password")
    public ResponseEntity<String> findPassword(@RequestBody PasswordFindRequestDTO passwordFindRequestDTO){
        try{
            String result = userService.findPassword(passwordFindRequestDTO);
            String response = stringUtil.maskPassword(result);
            return new ResponseEntity<String>(response, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }

    @PostMapping("/modify")
    public ResponseEntity<String> modify(@RequestHeader("Authorization") String token, @RequestBody ModifyDTO modifyDTO){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음
            modifyDTO.setEmail(email);

            userService.modify(modifyDTO);
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
    @PostMapping("/info")
    public ResponseEntity<ModifyDTO> Info(@RequestHeader("Authorization") String token){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            EmailPwDTO emailPwDTO = new EmailPwDTO();
            emailPwDTO.setEmail(email);

            ModifyDTO modifyDTO = userService.Info(emailPwDTO);
            return new ResponseEntity<ModifyDTO>(modifyDTO, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            ModifyDTO modifyDTO = new ModifyDTO();
            modifyDTO.setResult("FAILED");
            return new ResponseEntity<ModifyDTO>(modifyDTO, HttpStatus.OK);
        }
    }

    @PostMapping("/withdraw")
    public ResponseEntity<String> withdraw(@RequestHeader("Authorization") String token){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            EmailPwDTO emailPwDTO = new EmailPwDTO();
            emailPwDTO.setEmail(email);
            userService.withdraw(emailPwDTO);
            return new ResponseEntity<String>("SUCCESS", HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }

    @PostMapping("/myteam")
    public ResponseEntity<?> myteam(@RequestHeader("Authorization") String token){
        try{
            String decryptedToken= tokenProvider.validateTokenAndGetSubject(token);
            String[] parts = decryptedToken.split(":"); // ":"를 기준으로 문자열을 나누어 배열에 저장
            String email = parts[0]; // 이메일 주소는 배열의 첫 번째 요소에 있음

            System.out.println(decryptedToken);
            System.out.println(email);
            List<Team> myTeamList = userService.findMyTeam(email);
            return new ResponseEntity<List<Team>>(myTeamList, HttpStatus.OK);
        }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>("FAILED", HttpStatus.OK);
        }
    }
}
