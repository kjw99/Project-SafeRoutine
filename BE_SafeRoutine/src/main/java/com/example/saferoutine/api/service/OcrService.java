package com.example.saferoutine.api.service;

import com.example.saferoutine.common.util.FileUploadUtil;
import com.example.saferoutine.common.util.OCRUtil;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Service
public class OcrService {

    @Value("${naver.ocr.apiUrl}")
    private String apiURL;
    @Value("${naver.ocr.secretKey}")
    private String secretKey;

    private final FileUploadUtil fileUploadUtil;
    private final OCRUtil ocrUtil;

    public OcrService(FileUploadUtil fileUploadUtil, OCRUtil ocrUtil) {
        this.fileUploadUtil = fileUploadUtil;
        this.ocrUtil = ocrUtil;
    }

    public Map<String, Object> ocrCheckList(MultipartFile multipartFile) {
        String path = fileUploadUtil.fileUpload(multipartFile);
        if (path.equals("NotImage")) {
            Map<String, Object> result = new HashMap<>();
            result.put("결과", path);
            return result;
        }
        String[] savePath = fileUploadUtil.filePath(path);
        String ext = savePath[1].substring(savePath[1].lastIndexOf(".") + 1);

        Map<String, Object> map = new HashMap<>();
        map = ocrUtil.callOcrApi(apiURL, secretKey, savePath[0], savePath[1], ext);

        fileUploadUtil.fileRemove(savePath[1]);

        return map;
    }
}
