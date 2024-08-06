package com.example.saferoutine.api.controller;

import com.example.saferoutine.api.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/s3")
public class S3Controller {

    private final S3Service s3Service;

    @Autowired
    public S3Controller(S3Service s3Service) {
        this.s3Service = s3Service;
    }

        @PostMapping("/upload-user-image")
    public ResponseEntity<String> uploadUserProfileImage(@RequestPart("image") MultipartFile image){
        try {
            return new ResponseEntity<String>(s3Service.upload(image, "User/"), HttpStatus.OK);
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    @PostMapping("/upload-team-image")
    public ResponseEntity<String> uploadTeamProfileImage(@RequestPart("image") MultipartFile image){
        try {
            return new ResponseEntity<String>(s3Service.upload(image, "Team/"), HttpStatus.OK);
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }

    @PostMapping("/upload-answer-image")
    public ResponseEntity<String> uploadAnswerImage(@RequestPart("image") MultipartFile image, @RequestPart("teamId") Long teamId){
        try {
            if(teamId == null || teamId.equals("")){
                return  new ResponseEntity<>("TEAMID_FORMAT_INCORRECT", HttpStatus.BAD_REQUEST);
            }
            return new ResponseEntity<String>(s3Service.upload(image, "Answer/" + teamId + "/"), HttpStatus.OK);
        }
        catch (RuntimeException e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
        catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.OK);
        }
    }


}
