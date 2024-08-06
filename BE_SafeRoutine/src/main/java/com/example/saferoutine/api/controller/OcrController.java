package com.example.saferoutine.api.controller;

import com.example.saferoutine.api.service.OcrService;
import com.example.saferoutine.common.util.FileUploadUtil;
import com.example.saferoutine.common.util.OCRUtil;
import org.json.simple.JSONArray;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/ocr")
public class OcrController {

    private final OcrService ocrService;

    public OcrController(OcrService ocrService) {
        this.ocrService = ocrService;
    }

    @PostMapping("/check")
    public Map<String, Object> ocrFile(@RequestHeader("Authorization") String token, @RequestPart (value = "ocrImage") MultipartFile multipartFile) {

//        System.out.println("ocr 요청");
        return ocrService.ocrCheckList(multipartFile);
    }

}
