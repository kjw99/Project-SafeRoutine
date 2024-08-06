package com.example.saferoutine.common.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.*;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Component;

@Component
public class OCRUtil {

    public Map<String, Object> callOcrApi(String apiURL, String secretKey, String fileName, String imageFile, String ext) {

        Map<String, Object> parseData = null;

        try {
            URL url = new URL(apiURL);
            HttpURLConnection con = (HttpURLConnection)url.openConnection();
            con.setUseCaches(false);
            con.setDoInput(true);
            con.setDoOutput(true);
            con.setReadTimeout(30000);
            con.setRequestMethod("POST");
            String boundary = "----" + UUID.randomUUID().toString().replaceAll("-", "");
            con.setRequestProperty("Content-Type", "multipart/form-data; boundary=" + boundary);
            con.setRequestProperty("X-OCR-SECRET", secretKey);

            JSONObject json = new JSONObject();
            json.put("version", "V2");
            json.put("requestId", UUID.randomUUID().toString());
            json.put("timestamp", System.currentTimeMillis());
            JSONObject image = new JSONObject();
            image.put("format", ext);
            image.put("name", fileName);
            JSONArray images = new JSONArray();
            images.put(image);
            json.put("images", images);
            String postParams = json.toString();

            con.connect();
            DataOutputStream wr = new DataOutputStream(con.getOutputStream());
            long start = System.currentTimeMillis();
            File file = new File(imageFile);
            writeMultiPart(wr, postParams, file, boundary);
            wr.close();

            int responseCode = con.getResponseCode();
            BufferedReader br;
            if (responseCode == 200) {
                br = new BufferedReader(new InputStreamReader(con.getInputStream()));
            } else {
                br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
            }
            String inputLine;
            StringBuffer response = new StringBuffer();
            while ((inputLine = br.readLine()) != null) {
                response.append(inputLine);
            }
            br.close();

            parseData = jsonParse(response);

        } catch (Exception e) {
            System.out.println(e);
        }
        return parseData;

    }

    private void writeMultiPart(OutputStream out, String jsonMessage, File file, String boundary) throws
            IOException {
        StringBuilder sb = new StringBuilder();
        sb.append("--").append(boundary).append("\r\n");
        sb.append("Content-Disposition:form-data; name=\"message\"\r\n\r\n");
        sb.append(jsonMessage);
        sb.append("\r\n");

        out.write(sb.toString().getBytes("UTF-8"));
        out.flush();

        if (file != null && file.isFile()) {
            out.write(("--" + boundary + "\r\n").getBytes("UTF-8"));
            StringBuilder fileString = new StringBuilder();
            fileString
                    .append("Content-Disposition:form-data; name=\"file\"; filename=");
            fileString.append("\"" + file.getName() + "\"\r\n");
            fileString.append("Content-Type: application/octet-stream\r\n\r\n");
            out.write(fileString.toString().getBytes("UTF-8"));
            out.flush();

            try (FileInputStream fis = new FileInputStream(file)) {
                byte[] buffer = new byte[8192];
                int count;
                while ((count = fis.read(buffer)) != -1) {
                    out.write(buffer, 0, count);
                }
                out.write("\r\n".getBytes());
            }

            out.write(("--" + boundary + "--\r\n").getBytes("UTF-8"));
        }
        out.flush();
    }

    private static Map<String, Object> jsonParse(StringBuffer response) throws ParseException {

        // json 파싱
        JSONParser jsonParser = new JSONParser();
        org.json.simple.JSONObject jsonObject = (org.json.simple.JSONObject) jsonParser.parse(response.toString());
        // json의 images 배열을 obj화
        org.json.simple.JSONArray jsonArrayImage = (org.json.simple.JSONArray) jsonObject.get("images");

        org.json.simple.JSONObject jsonObjectImage = (org.json.simple.JSONObject) jsonArrayImage.get(0);
        org.json.simple.JSONArray jsonArrayFields = (org.json.simple.JSONArray) jsonObjectImage.get("fields");

        List<Map<String, Object>> textData = JsonUtil.getListMapFromJsonArray(jsonArrayFields);

        Map<String, Object> ocrResult = new HashMap<>();
        ocrResult.put("heightCheck", dataSetting(textData, "heightCheck"));
        ocrResult.put("heightNoCheck", dataSetting(textData, "heightNoCheck"));

        return ocrResult;
    }


    private static List<List<String>> dataSetting(List<Map<String, Object>> textData, String checkType) {
        List<List<String>> textArr = new ArrayList<>();
        textArr.add(new ArrayList<>());

        int line = 0;
        StringBuilder sentence = new StringBuilder();
        double prevX = -100;
        double prevY = -100;

        for (Map<String, Object> text : textData) {

            // 문장의 좌표들 저장
            Map<String, Object> boundingPoly = (Map<String, Object>) text.get("boundingPoly");
            List<Map<String, Object>> vertices = (List<Map<String, Object>>) boundingPoly.get("vertices");

            try {
                // 단어가 숫자인지 확인
                int num = Integer.parseInt((String) text.get("inferText"));
                // 숫자인 경우 다음 단어로
                continue;
            } catch (NumberFormatException e) {}

            if (prevX < 0) {

                // 이전 문장과 현재 문장의 y 위치값이 7 이상 차이가 나면 다른 칸으로 넘어갔다고 취급한다.
                if (check(checkType, prevY, (Double) vertices.get(0).get("y"))) {
                    textArr.get(line).add(sentence.toString()); // 이전 값 마지막 단어 추가.
                    line++; // 다음 라인으로.
                    textArr.add(new ArrayList<>());
                    sentence = new StringBuilder(text.get("inferText") + " ");
                }
                else {
                    sentence.append(text.get("inferText")).append(" ");
                }

                // 2번 위치는 단어의 오른쪽 아랫 부분 좌표.
                prevX = (Double) vertices.get(2).get("x");
                prevY = (Double) vertices.get(2).get("y");
            }
            else {
                if ((Double) vertices.get(0).get("x") - prevX > 10) { // 10보다 크다 = 띄어쓰기가 아니라 아예 다른 칸의 문장이다.
                    textArr.get(line).add(sentence.toString());
                    sentence = new StringBuilder(text.get("inferText") + " ");
                }
                else { // 10 미만이면 띄어쓰기 라고 판단.
                    sentence.append(text.get("inferText")).append(" ");
                }
                prevX = (Double) vertices.get(2).get("x");
                prevY = (Double) vertices.get(2).get("y");
            }

            if ((boolean) text.get("lineBreak")) {
                prevX = -100;
            }

        }

        textArr.get(line).add(sentence.toString()); // 마지막 단어 추가

        return textArr;
    }

    // 두줄 이상의 문항 확인 여부
    private static boolean check(String checkType, double prevY, double verticesY) {
        return switch (checkType) {
            case "heightCheck" -> prevY != -100 && verticesY - prevY > 7;
            case "heightNoCheck" -> prevY != -100;
            default -> false;
        };
    }

}

