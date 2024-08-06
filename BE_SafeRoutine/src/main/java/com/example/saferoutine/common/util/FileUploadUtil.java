package com.example.saferoutine.common.util;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

@Component
public class FileUploadUtil {

    private String path = "";


    // 파일 업로드. 지정된 경로에 파일을 저장하고 "파일의 진짜 이름&파일의 저장 경로" 형태의 문자열 List 반환
    public String fileUpload(MultipartFile file) {

        String fileInfo;
        path = System.getProperty("user.dir") + File.separator + "upload" + File.separator;
        System.out.println(path);
        // 파일 타입 확인. 이미지 타입이 아니면 NotImage로 리턴
        if (!Objects.requireNonNull(file.getContentType()).startsWith("image")) {
            return "NotImage";
        }
        String originalFilename = file.getOriginalFilename(); // 파일 진짜 이름
        String saveFileName = createSaveFileName(originalFilename); // 파일 저장용 이름
        String savePath = path + File.separator + saveFileName; // 파일 저장 경로

        try {
            file.transferTo(new File(savePath));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        fileInfo = originalFilename + "&" + savePath;

        return fileInfo;
    }

    public String[] filePath(String path) {
        return path.split("&");
    }

    public String fileRemove(String savePath) {

        File file = new File(savePath);
        boolean result = file.delete();
        if (result) return "삭제 완료";
        else return "삭제 실패";
    }

    // 저장할 위치 반환하는 메서드
    private String makeDir() {
        Date date = new Date();
        // 일 단위로 폴더 생성
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yy-MM-dd");
        String now = simpleDateFormat.format(date);
        String[] paths = path.split("/");
        StringBuilder uploadPath = new StringBuilder();
        for (String tempPath : paths) {
            uploadPath.append(tempPath).append(File.separator);
        }
        uploadPath.append(now);

        File file = new File(uploadPath.toString());
        // 폴더 없으면 생성
        file.mkdir();

        return uploadPath.toString();
    }

    // 저장용 이름 생성. 확장자 붙여서 반환.
    private String createSaveFileName(String originalFilename) {
        String ext = extractExt(originalFilename);
        String uuid = UUID.randomUUID().toString();
        return uuid + "." + ext;
    }

    // .확장자 반환
    private String extractExt(String originalFilename) {
        int pos = originalFilename.lastIndexOf(".");
        return originalFilename.substring(pos + 1);
    }

}
