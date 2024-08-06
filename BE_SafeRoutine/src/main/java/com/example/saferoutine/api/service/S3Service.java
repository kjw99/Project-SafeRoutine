package com.example.saferoutine.api.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;


@Slf4j
@Service
public class S3Service {

    private final AmazonS3 amazonS3;
    private final String bucket;

    public S3Service(AmazonS3 amazonS3, @Value("${cloud.aws.s3.bucket}") String bucket) {
        this.amazonS3 = amazonS3;
        this.bucket = bucket;
    }
    public String upload(MultipartFile image, String dirName) throws IOException {
//        1. 이미지 검증
        if(image == null ||image.isEmpty()){
            throw new RuntimeException("NO_IMAGE");
        }
//        2. 랜덤생성 파일명 지정, 디렉토리 포함
        String imgOrg = image.getOriginalFilename();
        String saveImageName = nameGenerator(imgOrg, dirName);
//        3. 메모리에서 빈 파일 생성하여 파일 정보 컨버트
        File uploadImage = convert(image);
//        4. S3에 파일 저장
        URL ImageUrl = putS3(uploadImage, saveImageName);
//        5. 메모리 내 파일 삭제
        removeNewFile(uploadImage);
//        업로드된 이미지 링크 반환
        return String.valueOf(ImageUrl);
    }

    public String nameGenerator(String name, String dirName){
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyMMddHHmmss");
        String currentDateAndTime = dateFormat.format(new Date());
        String randomString = UUID.randomUUID().toString().replace("-", "").substring(0, 8);

        return dirName + currentDateAndTime + randomString + name.replaceAll("\\s", "_");
    }


    private File convert(MultipartFile file) throws IOException {
        String originalFileName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String uniqueFileName = uuid + "_" + originalFileName.replaceAll("\\s", "_");
//        빈 파일에 파일 정보 삽입
        File convertFile = new File(uniqueFileName);
//        생성 여부 체크
        if (convertFile.createNewFile()) {
            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
                fos.write(file.getBytes());
            } catch (IOException e) {
                log.error("파일 변환 중 오류 발생: {}", e.getMessage());
                throw e;
            }
            return convertFile;
        }
        throw new IllegalArgumentException(String.format("FILE_CONVERT_FAILED", uniqueFileName));
    }

    private URL putS3(File uploadFile, String fileName) {
        amazonS3.putObject(new PutObjectRequest(bucket, fileName, uploadFile)
                .withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3.getUrl(bucket, fileName);
    }

    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            log.info("파일이 삭제되었습니다.");
        } else {
            log.info("파일이 삭제되지 못했습니다.");
        }
    }
}