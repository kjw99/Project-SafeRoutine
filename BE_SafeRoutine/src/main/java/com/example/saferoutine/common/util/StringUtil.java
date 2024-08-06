package com.example.saferoutine.common.util;

import org.springframework.stereotype.Component;

@Component
public class StringUtil {
    public static String maskPassword(String password) {
        if (password == null || password.length() <= 2) {
            return password;
        }

        char[] maskedChars = new char[password.length() - 2];
        for (int i = 0; i < maskedChars.length; i++) {
            maskedChars[i] = '*';
        }

        return password.charAt(0) + new String(maskedChars) + password.charAt(password.length() - 1);
    }
}
